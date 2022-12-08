import orderReducer, { initialOrderState } from "../../services/reducers/order";
import { TOrderAction } from "../../services/action-creators/order";
import * as types from "../../services/action-types/order";

describe("order reducer", () => {
	it("Testing initial order state", () => {
		expect(orderReducer(undefined, {} as TOrderAction)).toEqual({
			name: "",
			orderNumber: null,
			orderRequest: false,
			orderRequestFailed: false,
			errorMessage: null,
		});

		expect(orderReducer(initialOrderState, {} as TOrderAction)).toEqual({
			name: "",
			orderNumber: null,
			orderRequest: false,
			orderRequestFailed: false,
			errorMessage: null,
		});
	});

	it("should handle SET_ORDER_REQUEST", () => {
		expect(
			orderReducer(initialOrderState, {
				type: types.SET_ORDER_REQUEST,
			})
		).toEqual({
			...initialOrderState,
			orderRequest: true,
			orderRequestFailed: false,
		});
	});

	it("should handle SET_ORDER_SUCCESS", () => {
		expect(
			orderReducer(initialOrderState, {
				type: types.SET_ORDER_SUCCESS,
				name: "Ingredient caption",
				orderNumber: 100500,
			})
		).toEqual({
			...initialOrderState,
			name: "Ingredient caption",
			orderNumber: 100500,
			orderRequest: false,
			orderRequestFailed: false,
		});
	});

	it("should handle SET_ORDER_FAILED", () => {
		expect(
			orderReducer(initialOrderState, {
				type: types.SET_ORDER_FAILED,
				message: "Error message",
			})
		).toEqual({
			...initialOrderState,
			orderRequest: false,
			orderRequestFailed: true,
			errorMessage: "Error message",
		});
	});
});
