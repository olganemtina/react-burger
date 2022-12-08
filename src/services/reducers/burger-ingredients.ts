import { TBurgerIngredientsAction } from "../action-creators/burger-ingredients";
import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
} from "../action-types/burger-ingredients";
import { IIngredientDetails } from "../types/ingredient";

export interface IInitialIngredientsState {
	items: ReadonlyArray<IIngredientDetails>;
	buns: ReadonlyArray<IIngredientDetails>;
	ingredientsRequest: boolean;
	ingredientsRequestFailed: boolean;
	error: string;
}

export const initialIngredientsState: IInitialIngredientsState = {
	items: [],
	buns: [],
	ingredientsRequest: false,
	ingredientsRequestFailed: false,
	error: "",
};

export default function burgerIngredientsReducer(
	state = initialIngredientsState,
	action: TBurgerIngredientsAction
): IInitialIngredientsState {
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
