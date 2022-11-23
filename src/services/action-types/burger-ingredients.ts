import { getIngredientsData } from "../../utils/api/burger-api";
import {
	getIngredientsFailedAction,
	getIngredientsRequestAction,
	getIngredientsSuccessAction,
} from "../action-creators/burger-ingredients";
import { AppDispatch, AppThunk } from "../types";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
	dispatch(getIngredientsRequestAction());
	getIngredientsData()
		.then((response) => {
			dispatch(getIngredientsSuccessAction(response.data));
		})
		.catch((err) => {
			dispatch(getIngredientsFailedAction());
		});
};
