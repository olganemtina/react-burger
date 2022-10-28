import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burger-ingredients";
import orderReducer from "./order";
import burgerConstructorIngredientsReducer from "./burger-constructor-ingredients";
import currentIngredientReducer from "./current-ingredient";
import userReducer from "./user";

export const rootReducer = combineReducers({
	ingredients: burgerIngredientsReducer,
	burgerConstructorIngredients: burgerConstructorIngredientsReducer,
	order: orderReducer,
	currentIngredient: currentIngredientReducer,
	user: userReducer,
});
