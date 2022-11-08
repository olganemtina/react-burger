import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useDrag } from 'react-dnd';

interface IBurgerIngredient{
	count: number;
	id: string;
	caption: string;
	description: string;
	imgSrc: string;
	handleOpenModal: (ingredient: any) => void
}

export const BurgerIngredient : FC<IBurgerIngredient> = ({count, imgSrc, description, caption, handleOpenModal, id}) => {
	const [, dragRef] = useDrag({
        type: "ingredient",
        item: { id: id }
    });

	return (
		<div draggable ref={dragRef} className='mb-8 position_relative' onClick={handleOpenModal}>
			{count > 0 && <Counter count={count} size="default" />}
			<div className='text_align_center pl-4 pr-4'>
				<img src={imgSrc} alt="" />
			</div>
			<div className='text text_type_digits-default pt-1 pb-1 text_align_center'>
				<div className='inline-flex'>
					{description}
					<span className='pl-2'>
						<CurrencyIcon type="primary" />
					</span>
				</div>
			</div>
			<div className='text_align_center text text_type_main-default'>
				{caption}
			</div>
		</div>
	)
}



