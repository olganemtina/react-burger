import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
} from "../actions/burger-ingredients";

export function getIngredientsRequest() {
	return {
		type: GET_INGREDIENTS_REQUEST,
	};
}

export function getIngredientsSuccess(data) {
	return {
		type: GET_INGREDIENTS_SUCCESS,
		ingredients: data,
	};
}

export function getIngredientsFailed() {
	return {
		type: GET_INGREDIENTS_FAILED,
	};
}
