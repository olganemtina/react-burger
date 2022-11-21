import { TUserAction } from "../action-creators/user";
import {
	SET_USER_REQUEST,
	CLEAR_USER,
	GET_USER_REQUEST,
} from "../action-types/user";
import { IUserData } from "../types/auth";

export interface IInitialSUserState {
	loaded: boolean;
	data: IUserData | null;
	error: string | null;
}

const initialUserState: IInitialSUserState = {
	loaded: false,
	data: null,
	error: null,
};

export default function userReducer(
	state = initialUserState,
	action: TUserAction
) {
	switch (action.type) {
		case SET_USER_REQUEST: {
			return {
				...state,
				data: action.user ? { ...action.user } : null,
				loaded: true,
				error: action.error || null,
			};
		}
		case GET_USER_REQUEST: {
			return {
				...state,
				error: null,
			};
		}
		case CLEAR_USER: {
			return {
				...initialUserState,
			};
		}
		default:
			return state;
	}
}
