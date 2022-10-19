import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../action-creators/user";
import {
	loginRequest,
	registerRequest,
	getUserRequest as getFetchUser,
	updateUserRequest,
	passwordResetStep1Request,
	passwordResetStep2Request,
	signOutRequest,
} from "../../utils/auth-api";

export function useProvideAuth() {
	const user = useSelector((state) => {
		return state.user;
	});
	const dispatch = useDispatch();

	const getUser = async () => {
		const resultData = await getFetchUser();
		const user = resultData.success ? resultData.user : null;
		dispatch(setUser(user));
		return user;
	};

	const updateUser = async (formData) => {
		const resultData = await updateUserRequest(formData);
		if (resultData.success) {
			dispatch(setUser(resultData.user));
		}
	};

	const passwordResetStep1 = async (formData) => {
		const resultData = await passwordResetStep1Request(formData);
		return resultData;
	};

	const passwordResetStep2 = async (formData) => {
		const resultData = await passwordResetStep2Request(formData);
		return resultData;
	};

	const signIn = async (formData) => {
		const resultData = await loginRequest(formData);
		if (resultData.success) {
			dispatch(setUser(resultData.user));
		}
	};

	const signUp = async (formData) => {
		const resultData = await registerRequest(formData);
		if (resultData.success) {
			dispatch(setUser(resultData.user));
		}
	};

	const signOut = async () => {
		const resultData = await signOutRequest();
		if (resultData.success) {
			dispatch(setUser());
		}
	};

	return {
		signIn,
		signOut,
		signUp,
		getUser,
		updateUser,
		passwordResetStep1,
		passwordResetStep2,
		user,
	};
}
