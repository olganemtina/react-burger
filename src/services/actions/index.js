import { getIngredientsData, setOrderData } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";

export const SET_ORDER_REQUEST = "SET_ORDER_REQUEST";
export const SET_ORDER_SUCCESS = "SET_ORDER_SUCCESS";
export const SET_ORDER_FAILED = "SET_INGREDIENTS_FAILED";

export const GET_BURGER_INGREDIENTS_SUCCESS = "GET_BURGER_INGREDIENTS_SUCCESS";
export const ADD_BURGER_INGREDIENT_IN_CONSTRUCTOR =
	"ADD_BURGER_INGREDIENT_TO_CONSTRUCTOR";
export const UPDATE_BURGER_BUN_IN_CONSTRUCTOR =
	"UPDATE_BURGER_BUN_IN_CONSTRUCTOR";
export const REMOVE_BURGER_INGREDIENT_FROM_CONSTRUCTOR =
	"REMOVE_BURGER_INGREDIENT_FROM_CONSTRUCTOR";

export const SET_ORDER_BURGER_INGREDIENTS = "SET_ORDER_BURGER_INGREDIENTS";

export const getIngredients = () => (dispatch) => {
	dispatch({
		type: GET_INGREDIENTS_REQUEST,
	});
	getIngredientsData()
		.then((response) => {
			dispatch({
				type: GET_INGREDIENTS_SUCCESS,
				ingredients: response.data,
			});
			dispatch({
				type: GET_BURGER_INGREDIENTS_SUCCESS,
				ingredients: response.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_INGREDIENTS_FAILED,
			});
		});
};

export const setOrder = (ids) => (dispatch) => {
	dispatch({
		type: SET_ORDER_REQUEST,
	});
	setOrderData(ids)
		.then((response) => {
			dispatch({
				type: SET_ORDER_SUCCESS,
				name: response.name,
				orderNumber: response.order?.number,
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_ORDER_FAILED,
			});
		});
};
