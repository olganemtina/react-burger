import { combineReducers } from "redux";
import burgerIngredientsReducer from "./burger-ingredients";
import orderReducer from "./order";
import burgerConstructorIngredientsReducer from "./burger-constructor-ingredients";
import currentIngredientReducer from "./current-ingredient";
import userReducer from "./user";
import feedReducer from "./feed";

export const rootReducer = combineReducers({
	ingredients: burgerIngredientsReducer,
	burgerConstructorIngredients: burgerConstructorIngredientsReducer,
	order: orderReducer,
	currentIngredient: currentIngredientReducer,
	user: userReducer,
	feed: feedReducer,
});
