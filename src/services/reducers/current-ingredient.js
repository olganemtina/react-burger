import { SET_CURRENT_INGREDIENT } from "../actions/current-ingredient";

const initialCurrentIngredientState = null;

export default function currentIngredientReducer(
	state = initialCurrentIngredientState,
	action
) {
	switch (action.type) {
		case SET_CURRENT_INGREDIENT: {
			if (action.item) {
				return {
					...state,
					...action.item,
				};
			}
			return null;
		}
		default:
			return state;
	}
}
