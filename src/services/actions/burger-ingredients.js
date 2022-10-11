import {
	getIngredientsSuccess,
	getIngredientsFailed,
	getIngredientsRequest,
} from "../action-creators/burger-ingredients";
import { getBurgerIngredientsSuccess } from "../action-creators/burger-constructor-ingredients";
import { getIngredientsData } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredients = () => (dispatch) => {
	dispatch(getIngredientsRequest());
	getIngredientsData()
		.then((response) => {
			dispatch(getIngredientsSuccess(response.data));
		})
		.catch((err) => {
			dispatch(getIngredientsFailed());
		});
};
