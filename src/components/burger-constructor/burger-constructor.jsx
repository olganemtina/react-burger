import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import ingredientPropTypes from '../../prop-types/ingredient-prop-types';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import style from './burger-constructor.module.css';

export default function BurgerConstructor(props) {
	const [bun1, bun2] = useMemo(()=>{
		return props.ingredients.filter(x=>x.type==='bun');
	}, [props.ingredients]);

	const ingredients = useMemo(()=>{
		return props.ingredients.filter(x=>x.type!=='bun');
	}, [props.ingredients]);

	const [state, setState] = useState({
        visible: false
    });

	const handleOpenModal = useCallback(()=>{
		setState({
            visible:true
        });
	}, []);

	const handleCloseModal = useCallback(()=>{
		setState({
            visible:false
        });
	}, []);

	const totalPrice = useMemo(()=>{
		return props.ingredients.reduce((sum, current)=>{
			return sum + current.price;
		}, 0)
	}, [props.ingredients])

	return (
		<div>
			<div className={style.scroll_container}>
				{bun1  &&
					<BurgerConstructorItem
						key='bun1'
						draggable={false}
						name={bun1.name}
						price={bun1.price}
						type='top'
						image_mobile={bun1.image_mobile}/>}
				{ingredients.map((x)=>{
						return (
							<BurgerConstructorItem
								key={x._id}
								item_key={x._id}
								draggable={true}
								name={x.name}
								price={x.price}
								type=''
								image_mobile={x.image_mobile}/>
						)
					})}
				{bun2 &&
					<BurgerConstructorItem
						key='bun2'
						draggable={false}
						name={bun2.name}
						price={bun2.price}
						type='bottom'
						image_mobile={bun2.image_mobile}/>}
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
				state.visible &&
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

