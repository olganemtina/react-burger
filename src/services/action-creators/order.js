import {
	SET_ORDER_SUCCESS,
	SET_ORDER_FAILED,
	SET_ORDER_REQUEST,
} from "../actions/order";

export function setOrderSuccess(name, number) {
	return {
		type: SET_ORDER_SUCCESS,
		name: name,
		orderNumber: number,
	};
}

export function setOrderFailed(message = "Что-то пошло не так") {
	return {
		type: SET_ORDER_FAILED,
		message: message,
	};
}

export function setOrderRequest() {
	return {
		type: SET_ORDER_REQUEST,
	};
}
