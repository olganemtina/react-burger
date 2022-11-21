import {
	getUserRequest as getFetchUser,
	loginRequest,
	registerRequest,
	signOutRequest,
	updateUserRequest,
} from "../../utils/api/auth-api";
import { clearUser, getUserRequestAction, setUserAction } from "../action-creators/user";
import { AppDispatch, AppThunk } from "../types";
import { ILoginFormData, IRegisterFormData } from "../types/auth";

export const SET_USER_REQUEST: "SET_USER_REQUEST" = "SET_USER_REQUEST";
export const CLEAR_USER: "CLEAR_USER" = "CLEAR_USER";
export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";

export const getUser: AppThunk  = () => async (dispatch: AppDispatch) => {
	dispatch(getUserRequestAction());
	const resultData = await getFetchUser();
	if (resultData.success) {
		dispatch(setUserAction({ user: resultData.user }));
	} else {
		dispatch(setUserAction({ error: resultData.message }));
	}

};

export const updateUser: AppThunk = (formData: IRegisterFormData) => async (dispatch: AppDispatch) => {
	dispatch(getUserRequestAction());
	const resultData = await updateUserRequest(formData);
	if (resultData.success) {
		dispatch(setUserAction({ user: resultData.user}));
	} else {
		dispatch(setUserAction({ error: resultData.message }));
	}
};

export const signIn: AppThunk = (formData: ILoginFormData) => async (dispatch: AppDispatch) => {
	dispatch(getUserRequestAction());
	const resultData = await loginRequest(formData);
	if (resultData.success) {
		dispatch(setUserAction({ user: resultData.user }));
	} else {
		dispatch(setUserAction({ error: resultData.message }));
	}

};

export const signUp: AppThunk = (formData: IRegisterFormData) => async (dispatch: AppDispatch) => {
	dispatch(getUserRequestAction());
	const resultData = await registerRequest(formData);
	if (resultData.success) {
		dispatch(setUserAction({ user: resultData.user }));
	} else {
		dispatch(setUserAction({ error: resultData.message }));
	}
};

export const signOut: AppThunk = () => async (dispatch: AppDispatch) => {
	const resultData = await signOutRequest();
	if (resultData.success) {
		dispatch(clearUser());
	} else {
		dispatch(setUserAction({ error: resultData.message }));
	}
};
