import {
	ADD_BURGER_INGREDIENT_IN_CONSTRUCTOR,
	UPDATE_BURGER_BUN_IN_CONSTRUCTOR,
	SET_ORDER_BURGER_INGREDIENTS_CONSTRUCTOR,
	REMOVE_BURGER_INGREDIENT_FROM_CONSTRUCTOR,
	CLEAR_BURGER_INGREDIENTS_FROM_CONSTRUCTOR,
} from "../action-types/burger-constructor-ingredients";
import { IIngredientDetails } from "../types/ingredient";

export interface IAddBurgerIngredientToConstructorAction {
	type: typeof ADD_BURGER_INGREDIENT_IN_CONSTRUCTOR;
	item: IIngredientDetails & { key?: string };
}

export interface IUpdateBurgerIngredientToConstructorAction {
	type: typeof UPDATE_BURGER_BUN_IN_CONSTRUCTOR;
	currentBun: IIngredientDetails;
}

export interface ISetOrderBurgerIngredientsAction {
	type: typeof SET_ORDER_BURGER_INGREDIENTS_CONSTRUCTOR;
	dropIndex: number;
	dragIndex: number;
}

export interface IRemoveBurgerIngredientFromConstructorAction {
	type: typeof REMOVE_BURGER_INGREDIENT_FROM_CONSTRUCTOR;
	key: string;
}

export interface IClearBurgerIngredientsFromConstructorAction {
	type: typeof CLEAR_BURGER_INGREDIENTS_FROM_CONSTRUCTOR;
}

export type TBurgerConstructorIngredientsAction =
	| IAddBurgerIngredientToConstructorAction
	| IUpdateBurgerIngredientToConstructorAction
	| ISetOrderBurgerIngredientsAction
	| IRemoveBurgerIngredientFromConstructorAction
	| IClearBurgerIngredientsFromConstructorAction;

export const addBurgerIngredientToConstructorAction = (
	item: IIngredientDetails,
	key: string
): IAddBurgerIngredientToConstructorAction => {
	return {
		type: ADD_BURGER_INGREDIENT_IN_CONSTRUCTOR,
		item: { ...item, key },
	};
};

export const updateBurgerIngredientToConstructorAction = (
	item: IIngredientDetails
): IUpdateBurgerIngredientToConstructorAction => {
	return {
		type: UPDATE_BURGER_BUN_IN_CONSTRUCTOR,
		currentBun: item,
	};
};

export const setOrderBurgerIngredientsAction = (
	dropIndex: number,
	dragIndex: number
): ISetOrderBurgerIngredientsAction => {
	return {
		type: SET_ORDER_BURGER_INGREDIENTS_CONSTRUCTOR,
		dropIndex,
		dragIndex,
	};
};

export const removeBurgerIngredientFromConstructorAction = (
	item_key: string
): IRemoveBurgerIngredientFromConstructorAction => {
	return {
		type: REMOVE_BURGER_INGREDIENT_FROM_CONSTRUCTOR,
		key: item_key,
	};
};

export const clearBurgerIngredientsFromConstructorAction =
	(): IClearBurgerIngredientsFromConstructorAction => {
		return {
			type: CLEAR_BURGER_INGREDIENTS_FROM_CONSTRUCTOR,
		};
	};
