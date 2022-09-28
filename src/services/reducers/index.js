import { combineReducers } from "redux";
import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
	SET_CURRENT_INGREDIENT,
	ADD_BURGER_INGREDIENT_IN_CONSTRUCTOR,
	UPDATE_BURGER_BUN_IN_CONSTRUCTOR,
	REMOVE_BURGER_INGREDIENT_FROM_CONSTRUCTOR,
	SET_ORDER_REQUEST,
	SET_ORDER_SUCCESS,
	SET_ORDER_FAILED,
	SET_ORDER_BURGER_INGREDIENTS,
	GET_BURGER_INGREDIENTS_SUCCESS,
} from "../actions/index";

const initialIngredientsState = {
	items: [],
	buns: [],
	current: null,
	ingredientsRequest: false,
	ingredientsRequestFailed: false,
	error: "",
};

const initialBurgerConstructorIngredientsState = {
	items: [],
	buns: [],
};

const initialOrderState = {
	name: "",
	orderNumber: "",
	orderRequest: false,
	orderRequestFailed: false,
};

const ingredientsReducer = (state = initialIngredientsState, action) => {
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
		case SET_CURRENT_INGREDIENT: {
			return {
				...state,
				current: action.id
					? [...state.items, ...state.buns].find(
							(item) => item._id === action.id
					  )
					: null,
			};
		}
		default:
			return state;
	}
};

const burgerConstructorIngredientsReducer = (
	state = initialBurgerConstructorIngredientsState,
	action
) => {
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
		case GET_BURGER_INGREDIENTS_SUCCESS: {
			const [bun1, bun2] = action.ingredients.filter(
				(x) => x.type === "bun"
			);
			return {
				...state,
				buns: [bun1, bun1],
			};
		}
		case UPDATE_BURGER_BUN_IN_CONSTRUCTOR: {
			debugger;
			return {
				...state,
				buns: [action.currentBun, action.currentBun],
			};
		}
		case SET_ORDER_BURGER_INGREDIENTS: {
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
};

const orderReducer = (state = initialOrderState, action) => {
	switch (action.type) {
		case SET_ORDER_REQUEST: {
			return {
				...state,
				orderRequest: true,
				orderRequestFailed: false,
			};
		}
		case SET_ORDER_SUCCESS: {
			return {
				...state,
				name: action.name,
				orderNumber: action.orderNumber,
				orderRequest: false,
				orderRequestFailed: false,
			};
		}
		case SET_ORDER_FAILED: {
			return {
				...state,
				orderRequest: false,
				orderRequestFailed: true,
			};
		}
		default:
			return state;
	}
};

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerConstructorIngredients: burgerConstructorIngredientsReducer,
	order: orderReducer,
});
