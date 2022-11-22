import {
	setOrderFailedAction,
	setOrderRequestAction,
	setOrderSuccessAction,
} from "../action-creators/order";
import { setOrderData } from "../../utils/api/burger-api";
import { AppDispatch, AppThunk } from "../types";

export const SET_ORDER_REQUEST = "SET_ORDER_REQUEST";
export const SET_ORDER_SUCCESS = "SET_ORDER_SUCCESS";
export const SET_ORDER_FAILED: "SET_INGREDIENTS_FAILED" =
	"SET_INGREDIENTS_FAILED";

export const setOrder: AppThunk = (ids) => (dispatch: AppDispatch) => {
	dispatch(setOrderRequestAction());
	setOrderData(ids)
		.then((response) => {
			dispatch(
				setOrderSuccessAction(response.name, response.order?.number)
			);
		})
		.catch((err) => {
			dispatch(setOrderFailedAction());
		});
};
