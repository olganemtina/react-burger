import {
	ILoginFormData,
	IUserData,
	IRegisterFormData,
	IResetFormData,
} from "../../services/types/auth";
import { IRequestData, IResponseUserData } from "../../services/types/fetch";
import { deleteCookie, getCookie, setCookie } from "../cookie";
import { requestGet, requestWithBody } from "../request-api";

export const loginUrl = "https://norma.nomoreparties.space/api/auth/login";
export const registerUrl =
	"https://norma.nomoreparties.space/api/auth/register";
export const getUserUrl = "https://norma.nomoreparties.space/api/auth/user";
export const passwordResetStep1Url =
	"https://norma.nomoreparties.space/api/password-reset";
export const passwordResetStep2Url =
	"https://norma.nomoreparties.space/api/password-reset/reset";
export const signOutUrl = "https://norma.nomoreparties.space/api/auth/logout";
export const updateAccessTokenUrl =
	"https://norma.nomoreparties.space/api/auth/token";

export const loginRequest = async (formData: ILoginFormData) => {
	const requestData: IRequestData<ILoginFormData> = {
		url: loginUrl,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		formData,
	};
	return await requestWithBody(requestData).then(
		(result: IResponseUserData<IUserData>) => {
			setCookie("refreshToken", result.refreshToken);
			setCookie("accessToken", result.accessToken);
			return result;
		}
	);
};

export const registerRequest = async (formData: IRegisterFormData) => {
	const requestData: IRequestData<ILoginFormData> = {
		url: registerUrl,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		formData,
	};
	return await requestWithBody(requestData).then(
		(result: IResponseUserData<IUserData>) => {
			setCookie("refreshToken", result.refreshToken);
			setCookie("accessToken", result.accessToken);
			return result;
		}
	);
};

export const updateAccessTokenRequest = async () => {
	const requestData: IRequestData<{ token: string | undefined }> = {
		url: updateAccessTokenUrl,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		formData: {
			token: getCookie("refreshToken"),
		},
	};
	return await requestWithBody(requestData).then(
		(result: IResponseUserData) => {
			setCookie("refreshToken", result.refreshToken);
			setCookie("accessToken", result.accessToken);
			return result;
		}
	);
};

export const getUserRequest = async () => {
	return await requestGet(getUserUrl, {
		"Content-Type": "application/json",
		Authorization: getCookie("accessToken") || "",
	}).then(async (result: IResponseUserData<IUserData>) => {
		if (!result.success && result.message === "jwt expired") {
			await updateAccessTokenRequest();
			return requestGet(getUserUrl, {
				"Content-Type": "application/json",
				Authorization: getCookie("accessToken") || "",
			}).then((result: IResponseUserData<IUserData>) => {
				return result;
			});
		} else {
			return result;
		}
	});
};

export const updateUserRequest = async (formData: IRegisterFormData) => {
	const requestData: IRequestData<IRegisterFormData> = {
		url: getUserUrl,
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: getCookie("accessToken") || "",
		},
		formData,
	};
	return await requestWithBody(requestData).then(
		async (result: IResponseUserData<IUserData>) => {
			if (!result.success && result.message === "jwt expired") {
				updateAccessTokenRequest();
				return requestGet(getUserUrl, {
					"Content-Type": "application/json",
					Authorization: getCookie("accessToken") || "",
				}).then((result: IResponseUserData<IUserData>) => {
					return result;
				});
			} else {
				return result;
			}
		}
	);
};

export const passwordResetStep1Request = async (formData: {
	email: string;
}) => {
	const requestData: IRequestData<{ email: string }> = {
		url: passwordResetStep1Url,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		formData,
	};

	return await requestWithBody(requestData).then((result) => {
		return result;
	});
};

export const passwordResetStep2Request = async (formData: IResetFormData) => {
	const requestData: IRequestData<IResetFormData> = {
		url: passwordResetStep2Url,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		formData: formData,
	};
	return await requestWithBody(requestData).then((data) => {
		return data;
	});
};

export const signOutRequest = async () => {
	const requestData: IRequestData<{ token: string | undefined }> = {
		url: signOutUrl,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		formData: {
			token: getCookie("refreshToken"),
		},
	};
	return await requestWithBody(requestData).then((data) => {
		deleteCookie("refreshToken");
		deleteCookie("accessToken");
		return data;
	});
};
