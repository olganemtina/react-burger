import { SET_CURRENT_INGREDIENT } from "../actions/current-ingredient";

export function setCurrentIngredient(item) {
	return {
		type: SET_CURRENT_INGREDIENT,
		item: item,
	};
}
