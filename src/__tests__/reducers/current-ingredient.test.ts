import { TCurrentIngredientAction } from "../../services/action-creators/current-ingredient";
import { TOrderAction } from "../../services/action-creators/order";
import * as types from "../../services/action-types/current-ingredient";
import { IIngredientDetails } from "../../services/types/ingredient";
import currentIngredientReducer from "../../services/reducers/current-ingredient";
import { currentIngredient } from "../../__mocks__/ingredient-details.mock";

describe("current ingredient reducer", () => {
	it("Testing initial current ingredient state", () => {
		expect(
			currentIngredientReducer(
				undefined,
				{} as TCurrentIngredientAction
			)
		).toEqual(null);
	});

	it("should handle SET_CURRENT_INGREDIENT", () => {
		expect(
			currentIngredientReducer(null, {
				type: types.SET_CURRENT_INGREDIENT,
				item: currentIngredient,
			})
		).toEqual(currentIngredient);
	});
});
