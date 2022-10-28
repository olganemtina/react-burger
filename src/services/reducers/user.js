import {
	SET_USER_REQUEST,
	CLEAR_USER,
	GET_USER_REQUEST,
} from "../actions/user";

const initialUserState = {
	loaded: false,
	data: null,
	error: null,
};

export default function userReducer(state = initialUserState, action) {
	switch (action.type) {
		case SET_USER_REQUEST: {
			return {
				...state,
				data: action.user ? { ...action.user } : null,
				loaded: true,
				error: action.error,
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
