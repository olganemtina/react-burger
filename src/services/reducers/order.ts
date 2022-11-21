import { TOrderAction } from "../action-creators/order";
import {
	SET_ORDER_FAILED, SET_ORDER_REQUEST,
	SET_ORDER_SUCCESS
} from "../action-types/order";

export interface IInitialOrderState{
	name: string;
	orderNumber: number | null;
	orderRequest: boolean;
	orderRequestFailed: boolean;
	errorMessage: string | null
}

const initialOrderState: IInitialOrderState = {
	name: "",
	orderNumber: null,
	orderRequest: false,
	orderRequestFailed: false,
	errorMessage: null,
};

export default function orderReducer(state = initialOrderState, action : TOrderAction): IInitialOrderState {
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
