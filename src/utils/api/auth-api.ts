import { BASE_API_URL } from "../../services/constants/api-urls";
import {
	ILoginFormData,
	IRegisterFormData,
	IResetFormData,
	IUserData,
} from "../../services/types/auth";
import { IRequestData, IResponseUserData } from "../../services/types/fetch";
import { deleteCookie, getCookie, setCookie } from "../cookie";
import { requestGet, requestWithBody } from "../request-api";

export const loginUrl = `${BASE_API_URL}/auth/login`;
export const registerUrl = `${BASE_API_URL}/auth/register`;
export const getUserUrl = `${BASE_API_URL}/auth/user`;
export const passwordResetStep1Url = `${BASE_API_URL}/password-reset`;
export const passwordResetStep2Url = `${BASE_API_URL}/password-reset/reset`;
export const signOutUrl = `${BASE_API_URL}/auth/logout`;
export const updateAccessTokenUrl = `${BASE_API_URL}/auth/token`;

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
