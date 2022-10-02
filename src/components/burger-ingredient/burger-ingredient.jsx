import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

export default function BurgerIngredient(props) {
	const [, dragRef] = useDrag({
        type: "ingredient",
        item: { id: props.id }
    });

	return (
		<div draggable ref={dragRef} className='mb-8 position_relative' onClick={props.handleOpenModal}>
			{props.count > 0 && <Counter count={props.count} size="default" />}
			<div className='text_align_center pl-4 pr-4'>
				<img src={props.imgSrc} alt="" />
			</div>
			<div className='text text_type_digits-default pt-1 pb-1 text_align_center'>
				<div className='inline-flex'>
					{props.description}
					<span className='pl-2'>
						<CurrencyIcon type="primary" />
					</span>
				</div>
			</div>
			<div className='text_align_center text text_type_main-default'>
				{props.caption}
			</div>
		</div>
	)
}

BurgerIngredient.propTypes = {
	count: PropTypes.number,
	id: PropTypes.string.isRequired,
	caption:  PropTypes.string.isRequired,
	description:  PropTypes.string,
	imgSrc: PropTypes.string,
	handleOpenModal:  PropTypes.func
}
