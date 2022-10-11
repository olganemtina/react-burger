import {
	SET_ORDER_REQUEST,
	SET_ORDER_SUCCESS,
	SET_ORDER_FAILED,
} from "../actions/order";

const initialOrderState = {
	name: "",
	orderNumber: "",
	orderRequest: false,
	orderRequestFailed: false,
	errorMessage: null,
};

export default function orderReducer(state = initialOrderState, action) {
	switch (action.type) {
		case SET_ORDER_REQUEST: {
			return {
				...state,
				orderRequest: true,
				orderRequestFailed: false,
			};
		}
		case SET_ORDER_SUCCESS: {
			return {
				...state,
				name: action.name,
				orderNumber: action.orderNumber,
				orderRequest: false,
				orderRequestFailed: false,
			};
		}
		case SET_ORDER_FAILED: {
			return {
				...state,
				orderRequest: false,
				orderRequestFailed: true,
				errorMessage: action.message,
			};
		}
		default:
			return state;
	}
}
