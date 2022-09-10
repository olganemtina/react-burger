import React, { useState } from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import doneImg from '../../images/done.svg';

export default function OrderDetails(props) {

	return (
		<div className='text_align_center'>
			<div className='text text_type_digits-large'>789879</div>
			<div className='pt-8 text text_type_main-medium'>Ваш заказ начали готовить</div>
			<div className='pt-15'><img src={doneImg} /></div>
			<div className='pt-15 text text_type_main-default'>Ваш заказ начали готовить</div>
			<div className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</div>
		</div>
	)
}

