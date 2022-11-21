import {
	SET_ORDER_FAILED,
	SET_ORDER_REQUEST, SET_ORDER_SUCCESS
} from "../action-types/order";

export interface ISetOrderSuccessAction{
	type: typeof SET_ORDER_SUCCESS,
	name: string,
	orderNumber: number | null
}

export interface ISetOrderFailedAction{
	type: typeof SET_ORDER_FAILED,
	message: string
}

export interface ISetOrderRequestAction{
	type: typeof SET_ORDER_REQUEST
}

export type TOrderAction = ISetOrderSuccessAction
| ISetOrderFailedAction
| ISetOrderRequestAction;


export const setOrderSuccessAction = (name: string, number: number | null): ISetOrderSuccessAction => {
	return {
		type: SET_ORDER_SUCCESS,
		name: name,
		orderNumber: number,
	};
}

export const setOrderFailedAction = (message = "Что-то пошло не так"): ISetOrderFailedAction => {
	return {
		type: SET_ORDER_FAILED,
		message: message,
	};
}

export const setOrderRequestAction = ():ISetOrderRequestAction => {
	return {
		type: SET_ORDER_REQUEST,
	};
}
