import { stat } from "fs";
import { TBurgerConstructorIngredientsAction } from "../action-creators/burger-constructor-ingredients";
import {
	ADD_BURGER_INGREDIENT_IN_CONSTRUCTOR,
	REMOVE_BURGER_INGREDIENT_FROM_CONSTRUCTOR,
	UPDATE_BURGER_BUN_IN_CONSTRUCTOR,
	SET_ORDER_BURGER_INGREDIENTS_CONSTRUCTOR,
	CLEAR_BURGER_INGREDIENTS_FROM_CONSTRUCTOR,
} from "../action-types/burger-constructor-ingredients";
import { IIngredientDetails } from "../types/ingredient";

export interface IInitialBurgerConstructorIngredientsState {
	items: ReadonlyArray<IIngredientDetails & { key?: string }>;
	bun: IIngredientDetails | null;
}

export const initialBurgerConstructorIngredientsState: IInitialBurgerConstructorIngredientsState =
	{
		items: [],
		bun: null,
	};

export default function burgerConstructorIngredientsReducer(
	state = initialBurgerConstructorIngredientsState,
	action: TBurgerConstructorIngredientsAction
): IInitialBurgerConstructorIngredientsState {
	switch (action.type) {
		case ADD_BURGER_INGREDIENT_IN_CONSTRUCTOR: {
			return {
				...state,
				items: [
					...state.items,
					{ ...action.item, key: action.item._id },
				],
			};
		}
		case REMOVE_BURGER_INGREDIENT_FROM_CONSTRUCTOR: {
			return {
				...state,
				items: state.items.filter((x) => x.key !== action.key),
			};
		}
		case UPDATE_BURGER_BUN_IN_CONSTRUCTOR: {
			return {
				...state,
				bun: { ...action.currentBun },
			};
		}
		case SET_ORDER_BURGER_INGREDIENTS_CONSTRUCTOR: {
			const droppedItem = state.items[action.dropIndex];
			const draggedItem = state.items[action.dragIndex];
			let newItems = [...state.items];
			newItems[action.dropIndex] = draggedItem;
			newItems[action.dragIndex] = droppedItem;
			return {
				...state,
				items: newItems,
			};
		}
		case CLEAR_BURGER_INGREDIENTS_FROM_CONSTRUCTOR: {
			return {
				...initialBurgerConstructorIngredientsState,
			};
		}
		default:
			return state;
	}
}
