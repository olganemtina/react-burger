import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from "uuid";
import ingredientPropTypes from '../../prop-types/ingredient-prop-types';
import { addBurgerIngredientToConstructor, setOrderBurgerIngredients, updateBurgerIngredientToConstructor } from '../../services/action-creators/burger-constructor-ingredients';
import { setOrderFailed } from '../../services/action-creators/order';
import { setOrder } from '../../services/actions/order';
import { useProvideAuth } from '../../services/custom-hooks/use-provide-auth';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import style from './burger-constructor.module.css';


export default function BurgerConstructor() {
	const [bunTop, bunBottom] = useSelector((state)=>{
		return [state.burgerConstructorIngredients.bun, state.burgerConstructorIngredients.bun];
	})

	const buns = useSelector((state)=>{
		return state.ingredients.buns;
	})

	const ingredients = useSelector((state)=>{
		return state.ingredients.items;
	})

	const burgerIngredients = useSelector((state)=>{
		return state.burgerConstructorIngredients.items;
	});

	const dispatch = useDispatch();

	const [modalVisibility, setModalVisibility] = useState(false);

	const auth = useProvideAuth();
	const history = useHistory();

	const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
			const currentIngredient = ingredients.find(x=>x._id === item.id);
			if(currentIngredient)
			{
				dispatch(addBurgerIngredientToConstructor(currentIngredient, uuidv4()));
			}
			const currentBun = buns.find(x=>x._id === item.id);
			if(currentBun)
			{
				dispatch(updateBurgerIngredientToConstructor(currentBun));
			}
        }
    });

	const handleOpenModal = useCallback(async()=>{
		const user = auth.user ?? await auth.getUser();
		if(user)
		{
			if(bunTop && bunBottom)
			{
				const ids = [bunTop._id, ...burgerIngredients.map(x=>x._id), bunBottom._id];
				dispatch(setOrder(ids));
				setModalVisibility(true);
			}
			else
			{
				dispatch(setOrderFailed("Пожалуйста, добавьте булки в бургер"));
				setModalVisibility(true);
			}
		}
		else
		{
			history.replace({pathname: "/login"});
		}
	}, [burgerIngredients, bunTop, bunBottom]);

	const handleCloseModal = useCallback(()=>{
		setModalVisibility(false);
	}, []);

	const totalPrice = useMemo(()=>{
		let burgerBunsPrice = 0;
		if(bunTop && bunBottom)
		{
			burgerBunsPrice = bunTop.price + bunBottom.price;
		}
		const burgerIngredientsPrice = burgerIngredients.reduce((sum, current)=>{
			return sum + current.price;
		}, 0);
		return burgerBunsPrice+burgerIngredientsPrice;
	}, [burgerIngredients, bunTop, bunBottom]);

	const moveItemHandler = useCallback((dragIndex, dropIndex) => {
		dispatch(setOrderBurgerIngredients(dropIndex, dragIndex))
	  }, [])

	return (
		<div ref={dropTarget}>
			<div className={style.scroll_container}>
				{bunTop  &&
					<BurgerConstructorItem
						key='bunTop'
						item_key='bunTop'
						draggable={false}
						name={bunTop.name}
						price={bunTop.price}
						type='top'
						image_mobile={bunTop.image_mobile}/>}
				{burgerIngredients.map((x, index)=>{
						return (
							<BurgerConstructorItem
								key={x.key}
								item_key={x.key}
								draggable={true}
								name={x.name}
								price={x.price}
								type=''
								index={index}
								image_mobile={x.image_mobile}
								moveItem={moveItemHandler}/>
						)
					})}
				{bunBottom &&
					<BurgerConstructorItem
						key='bunBottom'
						item_key='bunBottom'
						draggable={false}
						name={bunBottom.name}
						price={bunBottom.price}
						type='bottom'
						image_mobile={bunBottom.image_mobile}/>}
			</div>
			<div className='mt-10 text-align-right total_price_container'>
				<span className='inline-flex mr-10 text text_type_digits-medium'>
					{totalPrice}
					<span className='pl-2'>
						<CurrencyIcon type="primary" />
					</span>
				</span>
				<Button onClick={handleOpenModal} type="primary" size="large">
					Оформить заказ
				</Button>
			</div>
			{
				modalVisibility && 
				<Modal header="" onClose={handleCloseModal} >
					<OrderDetails />
				</Modal>
			}
	</div>
	)
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes),
};

