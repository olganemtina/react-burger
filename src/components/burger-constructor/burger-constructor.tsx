import {
	Button,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { IIngredientDetails } from "../../services/types/ingredient";
import {
	addBurgerIngredientToConstructorAction,
	clearBurgerIngredientsFromConstructorAction,
	setOrderBurgerIngredientsAction,
	updateBurgerIngredientToConstructorAction,
} from "../../services/action-creators/burger-constructor-ingredients";
import { setOrderFailedAction } from "../../services/action-creators/order";
import { setOrder } from "../../services/action-types/order";
import { getUser } from "../../services/action-types/user";
import { BurgerConstructorItem } from "../burger-constructor-item/burger-constructor-item";
import { Modal } from "../modal/modal";
import { OrderSendNotify } from "../order-send-notify/order-send-notify";
import style from "./burger-constructor.module.css";
import { AppDataWithCurrency } from "../app-price/app-price";
import { useSelector } from "../../utils/hooks";
import { kMaxLength } from "buffer";

export const BurgerConstructor = () => {
	const [bunTop, bunBottom] = useSelector((state) => {
		return [
			state.burgerConstructorIngredients.bun,
			state.burgerConstructorIngredients.bun,
		];
	});

	const buns: ReadonlyArray<IIngredientDetails> = useSelector((state) => {
		return state.ingredients.buns;
	});

	const ingredients: ReadonlyArray<IIngredientDetails> = useSelector(
		(state) => {
			return state.ingredients.items;
		}
	);

	const burgerIngredients: ReadonlyArray<
		IIngredientDetails & { key?: string }
	> = useSelector((state) => {
		return state.burgerConstructorIngredients.items;
	});

	const user = useSelector((state) => {
		return state.user;
	});

	const order = useSelector((state) => {
		return state.order;
	});

	useEffect(() => {
		if (!user.loaded) {
			dispatch(getUser());
		}
	}, [user.loaded]);

	const dispatch = useDispatch();

	const [modalVisibility, setModalVisibility] = useState(false);

	const history = useHistory();

	const [, dropTarget] = useDrop({
		accept: "ingredient",
		drop(item: { id: string }) {
			const currentIngredient = ingredients.find(
				(x) => x._id === item.id
			);
			if (currentIngredient) {
				dispatch(
					addBurgerIngredientToConstructorAction(
						currentIngredient,
						uuidv4()
					)
				);
			}
			const currentBun = buns.find((x) => x._id === item.id);
			if (currentBun) {
				dispatch(
					updateBurgerIngredientToConstructorAction(currentBun)
				);
			}
		},
	});

	const handleOpenModal = useCallback(async () => {
		if (user.loaded && user.data) {
			if (bunTop && bunBottom) {
				const ids = [
					bunTop._id,
					...burgerIngredients.map((x) => x._id),
					bunBottom._id,
				];
				await dispatch(setOrder(ids));
				setModalVisibility(true);
			} else {
				await dispatch(
					setOrderFailedAction(
						"Пожалуйста, добавьте булки в бургер"
					)
				);
				setModalVisibility(true);
			}
		} else {
			history.replace({ pathname: "/login" });
		}
	}, [burgerIngredients, bunTop, bunBottom, user]);

	const handleCloseModal = useCallback(() => {
		setModalVisibility(false);
		if (order.orderNumber) {
			dispatch(clearBurgerIngredientsFromConstructorAction());
		}
	}, [order.orderNumber]);

	const totalPrice = useMemo(() => {
		let burgerBunsPrice = 0;
		if (bunTop && bunBottom) {
			burgerBunsPrice = bunTop.price + bunBottom.price;
		}
		const burgerIngredientsPrice = burgerIngredients.reduce(
			(sum, current) => {
				return sum + current.price;
			},
			0
		);
		return burgerBunsPrice + burgerIngredientsPrice;
	}, [burgerIngredients, bunTop, bunBottom]);

	const moveItemHandler = useCallback(
		(dragIndex: number, dropIndex: number) => {
			dispatch(setOrderBurgerIngredientsAction(dropIndex, dragIndex));
		},
		[]
	);

	return (
		<div ref={dropTarget}>
			<div className={style.scroll_container}>
				{bunTop && (
					<BurgerConstructorItem
						key="bunTop"
						item_key="bunTop"
						draggable={false}
						name={bunTop.name}
						price={bunTop.price}
						type="top"
						image_mobile={bunTop.image_mobile}
					/>
				)}
				{burgerIngredients.map((x, index: number) => {
					return (
						<BurgerConstructorItem
							key={x.key}
							item_key={x.key || index.toString()}
							draggable={true}
							name={x.name}
							price={x.price}
							index={index}
							image_mobile={x.image_mobile}
							moveItem={moveItemHandler}
						/>
					);
				})}
				{bunBottom && (
					<BurgerConstructorItem
						key="bunBottom"
						item_key="bunBottom"
						draggable={false}
						name={bunBottom.name}
						price={bunBottom.price}
						type="bottom"
						image_mobile={bunBottom.image_mobile}
					/>
				)}
			</div>
			<div className="mt-10 text-align-right total_price_container display_flex display_flex-center">
				<div className="mr-10 text text_type_digits-medium">
					<AppDataWithCurrency data={totalPrice} />
				</div>
				<Button
					htmlType="button"
					onClick={handleOpenModal}
					type="primary"
					size="large"
				>
					Оформить заказ
				</Button>
			</div>
			{modalVisibility && (
				<Modal header="" onClose={handleCloseModal}>
					<OrderSendNotify />
				</Modal>
			)}
		</div>
	);
};
