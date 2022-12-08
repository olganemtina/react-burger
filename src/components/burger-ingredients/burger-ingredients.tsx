import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { number } from "prop-types";
import {
	RefObject,
	UIEvent,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { setCurrentIngredientAction } from "../../services/action-creators/current-ingredient";
import { useAppDispatch } from "../../services/hooks/use-app-dispatch";
import { useAppSelector } from "../../services/hooks/use-app-selector";
import { IIngredientDetails } from "../../services/types/ingredient";
import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";
import style from "./burger-ingredients.module.css";

interface IGroupedIngredients {
	[name: string]: Array<IIngredientDetails>;
}

const getCaption = (type: string) => {
	switch (type) {
		case "bun":
			return "Булки";
		case "main":
			return "Начинки";
		case "sauce":
			return "Соусы";
	}
};

export const BurgerIngredients = () => {
	let location = useLocation();
	const [current, setCurrent] = useState<string>("bun");

	const buns = useAppSelector((state) => {
		return state.ingredients.buns;
	});
	const items = useAppSelector((state) => {
		return state.ingredients.items;
	});

	const burgerConstructorIngredients = useAppSelector((state) => {
		const ingredientsWithBuns = [
			...state.burgerConstructorIngredients.items,
		];
		if (state.burgerConstructorIngredients.bun) {
			ingredientsWithBuns.push(state.burgerConstructorIngredients.bun);
			ingredientsWithBuns.push(state.burgerConstructorIngredients.bun);
		}
		return ingredientsWithBuns.reduce((acc, item) => {
			if (acc[item._id]) {
				acc[item._id]++;
			} else {
				acc[item._id] = 1;
			}
			return acc;
		}, {} as Record<string, number>);
	});

	const dispatch = useAppDispatch();
	const history = useHistory();

	const handleOpenModal = useCallback(
		(ingredient: IIngredientDetails) => {
			dispatch(setCurrentIngredientAction(ingredient));
			history.push({
				pathname: `/ingredients/${ingredient._id}`,
				state: { background: location },
			});
		},
		[dispatch]
	);

	const groupedIngredients = useMemo<IGroupedIngredients>(() => {
		const groupedIngredients = [...buns, ...items].reduce(
			(acc, current) => {
				acc[current.type].push(current);
				return acc;
			},
			{ bun: [], sauce: [], main: [] } as IGroupedIngredients
		);
		return groupedIngredients;
	}, [buns, items]);

	const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
		const scrollTop = (e.target as HTMLDivElement).scrollTop;
		const range = {
			minHeight: 0,
			maxHeight: (refBun.current as HTMLDivElement).clientHeight,
		};
		Object.keys(groupedIngredients).every((type) => {
			if (
				range.minHeight <= scrollTop &&
				range.maxHeight >= scrollTop
			) {
				setCurrent(type);
				return false;
			} else {
				const currentRef = getRef(type);
				range.minHeight += (
					currentRef.current as HTMLDivElement
				).clientHeight;
				range.maxHeight += (
					currentRef.current as HTMLDivElement
				).clientHeight;
			}
			return true;
		});
	}, []);

	const refBun = useRef<HTMLDivElement>(null);
	const refMain = useRef<HTMLDivElement>(null);
	const refSauce = useRef<HTMLDivElement>(null);

	const getRef = (type: string) => {
		switch (type) {
			case "bun":
				return refBun;
			case "main":
				return refMain;
			case "sauce":
				return refSauce;
			default:
				return refBun;
		}
	};

	const goToBlock = (ref: RefObject<HTMLDivElement>, type: string) => {
		setCurrent(type);
		ref.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div>
			<h1 className="text text_type_main-large mb-5">
				Соберите бургер
			</h1>
			<div className="tabs" style={{ display: "flex" }}>
				<Tab
					value="bun"
					active={current === "bun"}
					onClick={() => goToBlock(refBun, "bun")}
				>
					Булки
				</Tab>
				<Tab
					value="sauce"
					active={current === "sauce"}
					onClick={() => goToBlock(refSauce, "sauce")}
				>
					Соусы
				</Tab>
				<Tab
					value="main"
					active={current === "main"}
					onClick={() => goToBlock(refMain, "main")}
				>
					Начинки
				</Tab>
			</div>
			<div className={style.scroll_container} onScroll={handleScroll}>
				{Object.entries(groupedIngredients).map(([key, value]) => {
					return (
						<div key={key} ref={getRef(key)}>
							<h2 className="pb-6 pt-10 text text_type_main-medium">
								{getCaption(key)}
							</h2>
							<div className="display_flex flex-wrap pl-4 pr-4 pb-10">
								{value.map((x, i) => {
									return (
										<div
											style={{ flex: 1 }}
											key={x._id}
										>
											<BurgerIngredient
												id={x._id}
												count={
													burgerConstructorIngredients[
														x._id
													] ?? 0
												}
												handleOpenModal={() =>
													handleOpenModal(
														x
													)
												}
												description="20"
												imgSrc={x.image}
												caption={x.name}
											/>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
