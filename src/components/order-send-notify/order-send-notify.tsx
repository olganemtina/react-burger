import doneImg from "../../images/done.svg";
import { useSelector } from "../../utils/hooks";

export const OrderSendNotify = () => {
	const order = useSelector((state) => {
		return state.order;
	});
	return (
		<div className="text_align_center">
			{!order.orderRequestFailed && !order.orderRequest && (
				<div>
					<div className="text text_type_digits-large">
						{order.orderNumber}
					</div>
					<div className="pt-8 text text_type_main-medium">
						Ваш заказ начали готовить
					</div>
					<div className="pt-15">
						<img src={doneImg} />
					</div>
					<div className="pt-15 text text_type_main-default">
						Ваш заказ начали готовить
					</div>
					<div className="text text_type_main-default text_color_inactive">
						Дождитесь готовности на орбитальной станции
					</div>
				</div>
			)}
			{order.orderRequestFailed == true && (
				<div>{order.errorMessage}</div>
			)}
			{order.orderRequest == true && (
				<div>
					<div className="pt-8 text text_type_main-medium pb-8">
						Заказ формируется...
					</div>
				</div>
			)}
		</div>
	);
};
