import { SET_USER } from "../actions/user";
export const setUser = (user) => {
	return {
		type: SET_USER,
		user: user,
	};
};
