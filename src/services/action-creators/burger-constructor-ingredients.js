import {
	ADD_BURGER_INGREDIENT_IN_CONSTRUCTOR,
	UPDATE_BURGER_BUN_IN_CONSTRUCTOR,
	SET_ORDER_BURGER_INGREDIENTS_CONSTRUCTOR,
	REMOVE_BURGER_INGREDIENT_FROM_CONSTRUCTOR,
} from "../actions/burger-constructor-ingredients";

export function addBurgerIngredientToConstructor(item, key) {
	return {
		type: ADD_BURGER_INGREDIENT_IN_CONSTRUCTOR,
		item: { ...item, key },
	};
}

export function updateBurgerIngredientToConstructor(item) {
	return {
		type: UPDATE_BURGER_BUN_IN_CONSTRUCTOR,
		currentBun: item,
	};
}

export function setOrderBurgerIngredients(dropIndex, dragIndex) {
	return {
		type: SET_ORDER_BURGER_INGREDIENTS_CONSTRUCTOR,
		dropIndex,
		dragIndex,
	};
}

export function removeBurgerIngredientFromConstructor(item_key) {
	return {
		type: REMOVE_BURGER_INGREDIENT_FROM_CONSTRUCTOR,
		key: item_key,
	};
}
