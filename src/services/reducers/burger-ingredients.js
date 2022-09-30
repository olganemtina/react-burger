import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
} from "../actions/burger-ingredients";

const initialIngredientsState = {
	items: [],
	buns: [],
	current: null,
	ingredientsRequest: false,
	ingredientsRequestFailed: false,
	error: "",
};

export default function burgerIngredientsReducer(
	state = initialIngredientsState,
	action
) {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return {
				...state,
				ingredientsRequest: true,
				ingredientsRequestFailed: false,
			};
		}
		case GET_INGREDIENTS_SUCCESS: {
			return {
				...state,
				items: action.ingredients.filter((x) => x.type !== "bun"),
				buns: action.ingredients.filter((x) => x.type === "bun"),
				ingredientsRequest: false,
				ingredientsRequestFailed: false,
			};
		}
		case GET_INGREDIENTS_FAILED: {
			return {
				...state,
				ingredientsRequest: false,
				ingredientsRequestFailed: true,
			};
		}
		default:
			return state;
	}
}
