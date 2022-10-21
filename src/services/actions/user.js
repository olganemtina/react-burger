import {
	getUserRequest as getFetchUser,
	loginRequest,
	registerRequest,
	signOutRequest,
	updateUserRequest,
} from "../../utils/auth-api";
import { clearUser, getUserRequest, setUser } from "../action-creators/user";

export const SET_USER_REQUEST = "SET_USER_REQUEST";
export const CLEAR_USER = "CLEAR_USER";
export const GET_USER_REQUEST = "GET_USER_REQUEST";

export const getUser = () => async (dispatch) => {
	dispatch(getUserRequest());
	const resultData = await getFetchUser();
	if (resultData.success) {
		dispatch(setUser({ user: resultData.user }));
	} else {
		dispatch(setUser({ error: resultData.message }));
	}
};

export const updateUser = (formData) => async (dispatch) => {
	dispatch(getUserRequest());
	const resultData = await updateUserRequest(formData);
	if (resultData.success) {
		dispatch(setUser({ user: resultData.user }));
	} else {
		dispatch(setUser({ error: resultData.message }));
	}
};

export const signIn = (formData) => async (dispatch) => {
	dispatch(getUserRequest());
	const resultData = await loginRequest(formData);
	if (resultData.success) {
		dispatch(setUser({ user: resultData.user }));
	} else {
		dispatch(setUser({ error: resultData.message }));
	}
};

export const signUp = (formData) => async (dispatch) => {
	dispatch(getUserRequest());
	const resultData = await registerRequest(formData);
	if (resultData.success) {
		dispatch(setUser({ user: resultData.user }));
	} else {
		dispatch(setUser({ error: resultData.message }));
	}
};

export const signOut = () => async (dispatch) => {
	const resultData = await signOutRequest();
	if (resultData.success) {
		dispatch(clearUser());
	} else {
		dispatch(setUser({ error: resultData.message }));
	}
};
