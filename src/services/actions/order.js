import { setOrderFailed, setOrderSuccess } from "../action-creators/order";
import { setOrderData } from "../../utils/burger-api";

export const SET_ORDER_REQUEST = "SET_ORDER_REQUEST";
export const SET_ORDER_SUCCESS = "SET_ORDER_SUCCESS";
export const SET_ORDER_FAILED = "SET_INGREDIENTS_FAILED";

export const setOrder = (ids) => (dispatch) => {
	dispatch(setOrderFailed());
	setOrderData(ids)
		.then((response) => {
			dispatch(setOrderSuccess(response.name, response.order?.number));
		})
		.catch((err) => {
			dispatch(setOrderFailed());
		});
};
