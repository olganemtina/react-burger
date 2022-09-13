import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function BurgerConstructorItem({name, price, image_mobile, type, draggable}) {
	return (
		<div className='mt-4 mb-4' style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
			{draggable ? <DragIcon type="primary" /> : <span className='mr-6'></span>}
			<ConstructorElement
				type={type}
				text={name}
				price={price}
				thumbnail={image_mobile}
			/>
		</div>
	)
}

BurgerConstructorItem.propTypes = {
    name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image_mobile: PropTypes.string.isRequired,
	type: PropTypes.string,
	draggable: PropTypes.bool
};
