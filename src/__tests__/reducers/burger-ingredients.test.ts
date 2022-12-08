import { TBurgerIngredientsAction } from "../../services/action-creators/burger-ingredients";
import * as types from "../../services/action-types/burger-ingredients";
import burgerIngredientsReducer, {
	initialIngredientsState,
} from "../../services/reducers/burger-ingredients";

describe("burger ingredients reducer", () => {
	it("Testing initial burger ingredients state", () => {
		expect(
			burgerIngredientsReducer(
				undefined,
				{} as TBurgerIngredientsAction
			)
		).toEqual({
			items: [],
			buns: [],
			ingredientsRequest: false,
			ingredientsRequestFailed: false,
			error: "",
		});
	});

	it("should handle GET_INGREDIENTS_REQUEST", () => {
		expect(
			burgerIngredientsReducer(initialIngredientsState, {
				type: types.GET_INGREDIENTS_REQUEST,
			})
		).toEqual({
			items: [],
			buns: [],
			error: "",
			ingredientsRequest: true,
			ingredientsRequestFailed: false,
		});
	});
});
