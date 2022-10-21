import {
	SET_USER_REQUEST,
	CLEAR_USER,
	GET_USER_REQUEST,
} from "../actions/user";
export const setUser = (data = {}) => {
	return {
		type: SET_USER_REQUEST,
		user: data.user,
		error: data.error,
	};
};

export const clearUser = () => {
	return {
		type: CLEAR_USER,
	};
};

export const getUserRequest = () => {
	return {
		type: GET_USER_REQUEST,
	};
};
