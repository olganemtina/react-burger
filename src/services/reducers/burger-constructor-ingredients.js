import {
	ADD_BURGER_INGREDIENT_IN_CONSTRUCTOR,
	REMOVE_BURGER_INGREDIENT_FROM_CONSTRUCTOR,
	UPDATE_BURGER_BUN_IN_CONSTRUCTOR,
	SET_ORDER_BURGER_INGREDIENTS_CONSTRUCTOR,
} from "../actions/burger-constructor-ingredients";

const initialBurgerConstructorIngredientsState = {
	items: [],
	bun: null,
};

export default function burgerConstructorIngredientsReducer(
	state = initialBurgerConstructorIngredientsState,
	action
) {
	switch (action.type) {
		case ADD_BURGER_INGREDIENT_IN_CONSTRUCTOR: {
			return {
				...state,
				items: [...state.items, { ...action.item }],
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
		default:
			return state;
	}
}
