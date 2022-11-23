import {
	CLEAR_USER,
	GET_USER_REQUEST,
	SET_USER_REQUEST,
} from "../action-types/user";
import { IUserData } from "../types/auth";

export interface ISetUserAction {
	type: typeof SET_USER_REQUEST;
	user?: IUserData;
	error?: string;
}

export interface IClearUserAction {
	type: typeof CLEAR_USER;
}

export interface IGetUserRequestAction {
	type: typeof GET_USER_REQUEST;
}

export type TUserAction =
	| ISetUserAction
	| IClearUserAction
	| IGetUserRequestAction;

export const setUserAction = (data: {
	error?: string;
	user?: IUserData;
}): ISetUserAction => {
	return {
		type: SET_USER_REQUEST,
		user: data.user,
		error: data.error,
	};
};

export const clearUser = (): IClearUserAction => {
	return {
		type: CLEAR_USER,
	};
};

export const getUserRequestAction = () => {
	return {
		type: GET_USER_REQUEST,
	};
};
