import { TCurrentIngredientAction } from "../action-creators/current-ingredient";
import { SET_CURRENT_INGREDIENT } from "../action-types/current-ingredient";
import { IIngredientDetails } from "../types/ingredient";

const initialCurrentIngredientState: IIngredientDetails | null = null;

export default function currentIngredientReducer(
	state = initialCurrentIngredientState,
	action: TCurrentIngredientAction
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
