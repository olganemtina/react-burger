import { SET_CURRENT_INGREDIENT } from "../action-types/current-ingredient";
import { IIngredientDetails } from "../types/ingredient";

export interface ISetCurrentIngredientAction {
	type: typeof SET_CURRENT_INGREDIENT;
	item: IIngredientDetails;
}

export type TCurrentIngredientAction = ISetCurrentIngredientAction;

export const setCurrentIngredientAction = (
	item: IIngredientDetails
): ISetCurrentIngredientAction => {
	return {
		type: SET_CURRENT_INGREDIENT,
		item: item,
	};
};
