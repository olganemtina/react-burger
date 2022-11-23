import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
} from "../action-types/burger-ingredients";
import { IIngredientDetails } from "../types/ingredient";


export interface IGetIngredientsRequestAction{
	type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccessAction{
	type: typeof GET_INGREDIENTS_SUCCESS,
	ingredients: ReadonlyArray<IIngredientDetails>
}

export interface IGetIngredientsFailedAction{
	type: typeof GET_INGREDIENTS_FAILED
}

export type TBurgerIngredientsAction = IGetIngredientsRequestAction | IGetIngredientsSuccessAction | IGetIngredientsFailedAction;


export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => {
	return {
		type: GET_INGREDIENTS_REQUEST,
	};
}

export const getIngredientsSuccessAction = (data: ReadonlyArray<IIngredientDetails>): IGetIngredientsSuccessAction => {
	return {
		type: GET_INGREDIENTS_SUCCESS,
		ingredients: data,
	};
}

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => {
	return {
		type: GET_INGREDIENTS_FAILED,
	};
}
