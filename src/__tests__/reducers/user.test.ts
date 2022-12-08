import { TUserAction } from "../../services/action-creators/user";
import * as types from "../../services/action-types/user";
import { IUserData } from "../../services/types/auth";
import userReducer, {
	IInitialUserState,
	initialUserState,
} from "../../services/reducers/user";

describe("user reducer", () => {
	it("Testing initial user state", () => {
		expect(userReducer(undefined, {} as TUserAction)).toEqual({
			loaded: false,
			data: null,
			error: null,
		});
	});

	it("should handle GET_USER_REQUEST", () => {
		expect(
			userReducer(initialUserState, {
				type: types.GET_USER_REQUEST,
			})
		).toEqual({
			loaded: false,
			data: null,
			error: null,
		});
	});

	it("should handle SET_USER_REQUEST", () => {
		expect(
			userReducer(initialUserState, {
				type: types.SET_USER_REQUEST,
				user: {
					email: "xxx123@yandex.ru",
					name: "sa",
				} as IUserData,
				error: "Error",
			})
		).toEqual({
			data: {
				email: "xxx123@yandex.ru",
				name: "sa",
			} as IUserData,
			loaded: true,
			error: "Error",
		});
	});

	it("should handle CLEAR_USER", () => {
		expect(
			userReducer(initialUserState, {
				type: types.CLEAR_USER,
			})
		).toEqual({
			...initialUserState,
		});
	});
});
