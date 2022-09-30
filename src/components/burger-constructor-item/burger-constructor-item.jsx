import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import {removeBurgerIngredientFromConstructor} from '../../services/action-creators/burger-constructor-ingredients'

export default function BurgerConstructorItem({name, price, item_key, image_mobile, type, draggable, index, moveItem}) {
	const dispatch = useDispatch();
	const removeItem = ()=>{
		dispatch(removeBurgerIngredientFromConstructor(item_key));
	}

	const ref = useRef(null)
	const [, drop] = useDrop({
	  accept: "burgerIngredientItem",
	  hover(item, monitor) {
		if (!ref.current) {
		  return
		}
		const dragIndex = item.index
		const dropIndex = index;
		if (dragIndex === dropIndex) {
		  return
		}
		moveItem(dragIndex, dropIndex)
		item.index = dropIndex
	  },
	})
	const [{ isDragging }, drag] = useDrag({
	  type: "burgerIngredientItem",
	  item: () => {
		return { item_key, index }
	  },
	  collect: (monitor) => ({
		isDragging: monitor.isDragging(),
	  }),
	})
	drag(drop(ref))
	return (
		<div ref={draggable ? ref : null} className='mt-4 mb-4' style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
			{draggable ? <DragIcon type="primary" /> : <span className='mr-6'></span>}
			<ConstructorElement
				type={type}
				text={name}
				price={price}
				thumbnail={image_mobile}
				handleClose = {removeItem}
			/>
		</div>
	)
}

BurgerConstructorItem.propTypes = {
    name: PropTypes.string.isRequired,
	item_key: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image_mobile: PropTypes.string.isRequired,
	type: PropTypes.string,
	draggable: PropTypes.bool
};
