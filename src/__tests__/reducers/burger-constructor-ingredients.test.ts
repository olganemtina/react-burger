import { TBurgerConstructorIngredientsAction } from "../../services/action-creators/burger-constructor-ingredients";
import burgerConstructorIngredientsReducer, {
	initialBurgerConstructorIngredientsState as initialState,
} from "../../services/reducers/burger-constructor-ingredients";
import * as types from "../../services/action-types/burger-constructor-ingredients";
import { currentIngredient } from "../../__mocks__/ingredient-details.mock";

describe("burger constructor ingredients reducer", () => {
	it("Testing initial burger constructor ingredients state", () => {
		expect(
			burgerConstructorIngredientsReducer(
				undefined,
				{} as TBurgerConstructorIngredientsAction
			)
		).toEqual({
			items: [],
			bun: null,
		});
	});

	it("should handle ADD_BURGER_INGREDIENT_IN_CONSTRUCTOR", () => {
		expect(
			burgerConstructorIngredientsReducer(initialState, {
				type: types.ADD_BURGER_INGREDIENT_IN_CONSTRUCTOR,
				item: currentIngredient,
			})
		).toEqual({
			...initialState,
			items: [...initialState.items, { ...currentIngredient }],
		});
	});

	it("should handle CLEAR_BURGER_INGREDIENTS_FROM_CONSTRUCTOR", () => {
		expect(
			burgerConstructorIngredientsReducer(initialState, {
				type: types.CLEAR_BURGER_INGREDIENTS_FROM_CONSTRUCTOR,
			})
		).toEqual({
			...initialState,
		});
	});

	it("should handle REMOVE_BURGER_INGREDIENT_FROM_CONSTRUCTOR", () => {
		expect(
			burgerConstructorIngredientsReducer(initialState, {
				type: types.REMOVE_BURGER_INGREDIENT_FROM_CONSTRUCTOR,
				key: currentIngredient._id,
			})
		).toEqual({
			...initialState,
			items: initialState.items.filter(
				(x) => x.key !== currentIngredient._id
			),
		});
	});

	it("should handle SET_ORDER_BURGER_INGREDIENTS_CONSTRUCTOR", () => {
		const dragIndex = 1;
		const dropIndex = 2;
		const droppedItem = initialState.items[dragIndex];
		const draggedItem = initialState.items[dropIndex];
		let newItems = [...initialState.items];
		newItems[dropIndex] = draggedItem;
		newItems[dragIndex] = droppedItem;

		expect(
			burgerConstructorIngredientsReducer(initialState, {
				type: types.SET_ORDER_BURGER_INGREDIENTS_CONSTRUCTOR,
				dragIndex: dragIndex,
				dropIndex: dropIndex,
			})
		).toEqual({
			...initialState,
			items: newItems,
		});
	});

	it("should handle UPDATE_BURGER_BUN_IN_CONSTRUCTOR", () => {
		expect(
			burgerConstructorIngredientsReducer(initialState, {
				type: types.UPDATE_BURGER_BUN_IN_CONSTRUCTOR,
				currentBun: currentIngredient,
			})
		).toEqual({
			...initialState,
			bun: { ...currentIngredient },
		});
	});
});
