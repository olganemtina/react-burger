import { useSelector } from 'react-redux';
import doneImg from '../../images/done.svg';

export default function OrderDetails() {
	const order = useSelector((state)=>{
		return state.order
	})
	return (
		<div className='text_align_center'>
			{!order.orderRequestFailed &&
				<div>
					<div className='text text_type_digits-large'>{order.orderNumber}</div>
					<div className='pt-8 text text_type_main-medium'>Ваш заказ начали готовить</div>
					<div className='pt-15'><img src={doneImg} /></div>
					<div className='pt-15 text text_type_main-default'>Ваш заказ начали готовить</div>
					<div className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</div>
				</div>
			}
			{/* Не понимаю, почему в модалке до того, как вернутся данные, отображатся надпись "Что-то пошло не так",
			если order.orderRequestFailed = false?
			*/}
			{order.orderRequestFailed &&
				<div>
					{order.errorMessage}
				</div>
			}
			{order.orderRequest && <div>
				Заказ формируется
			</div>}
		</div>
	)
}


