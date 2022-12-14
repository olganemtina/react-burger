import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { removeBurgerIngredientFromConstructorAction } from '../../services/action-creators/burger-constructor-ingredients';

interface IBurgerConstructorItem{
	name: string;
	price: number;
	item_key: string;
	image_mobile: string;
	type?: "top" | "bottom" | undefined;
	draggable?: boolean;
	index?: number;
	moveItem?: (dragIndex: number, dropIndex: number) => void
}

type DragItem = {
	index: number
}

export const BurgerConstructorItem : FC<IBurgerConstructorItem>= ({name, price, item_key, image_mobile, type = undefined, draggable, index, moveItem}) => {
	const dispatch = useDispatch();
	const removeItem = ()=>{
		dispatch(removeBurgerIngredientFromConstructorAction(item_key));
	}

	const ref = useRef<HTMLDivElement>(null)
	const [, drop] = useDrop({
	  accept: "burgerIngredientItem",
	  hover(item: DragItem, monitor: DropTargetMonitor) {
		if (!ref.current) {
		  return
		}
		const dragIndex = item.index
		const dropIndex = index;
		if (dragIndex === dropIndex) {
		  return
		}
		if(moveItem && dropIndex)
		{
			moveItem(dragIndex, dropIndex)
			item.index = dropIndex
		}
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
