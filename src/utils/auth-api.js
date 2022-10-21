import { checkReponseAndGetData } from "./helpers";
import { setCookie, getCookie, deleteCookie } from "../utils/cookie";
const loginUrl = "https://norma.nomoreparties.space/api/auth/login";
const registerUrl = "https://norma.nomoreparties.space/api/auth/register";
const getUserUrl = "https://norma.nomoreparties.space/api/auth/user";
const passwordResetStep1Url =
	"https://norma.nomoreparties.space/api/password-reset";
const passwordResetStep2Url =
	"https://norma.nomoreparties.space/api/password-reset/reset";
const signOutUrl = "https://norma.nomoreparties.space/api/auth/logout";
const updateAccessTokenUrl = "https://norma.nomoreparties.space/api/auth/token";

export const loginRequest = async (formData) => {
	return await requestWithBody(
		loginUrl,
		"POST",
		{
			"Content-Type": "application/json",
		},
		formData
	).then((data) => {
		setCookie("refreshToken", data.refreshToken);
		setCookie("accessToken", data.accessToken);
		return data;
	});
};

export const registerRequest = async (formData) => {
	return await requestWithBody(
		registerUrl,
		"POST",
		{
			"Content-Type": "application/json",
		},
		formData
	).then((data) => {
		setCookie("refreshToken", data.refreshToken);
		setCookie("accessToken", data.accessToken);
		return data;
	});
};

export const updateAccessTokenRequest = async () => {
	return await requestWithBody(
		updateAccessTokenUrl,
		"POST",
		{
			"Content-Type": "application/json",
		},
		{
			token: getCookie("refreshToken"),
		}
	).then((data) => {
		setCookie("refreshToken", data.refreshToken);
		setCookie("accessToken", data.accessToken);
		return data;
	});
};

export const getUserRequest = async () => {
	return await requestGet(getUserUrl, {
		"Content-Type": "application/json",
		Authorization: getCookie("accessToken"),
	}).then(async (result) => {
		if (!result.success && result.message === "jwt expired") {
			await updateAccessTokenRequest();
			requestGet(getUserUrl, {
				"Content-Type": "application/json",
				Authorization: getCookie("accessToken"),
			}).then((result) => {
				return result;
			});
		} else {
			return result;
		}
	});
};

export const updateUserRequest = async (formData) => {
	return await requestWithBody(
		getUserUrl,
		"PATCH",
		{
			"Content-Type": "application/json",
			Authorization: getCookie("accessToken"),
		},
		formData
	).then(async (result) => {
		if (!result.success && result.message === "jwt expired") {
			updateAccessTokenRequest();
			requestGet(getUserUrl, {
				"Content-Type": "application/json",
				Authorization: getCookie("accessToken"),
			}).then((result) => {
				return result;
			});
		} else {
			return result;
		}
	});
};

export const passwordResetStep1Request = async (formData) => {
	return await requestWithBody(
		passwordResetStep1Url,
		"POST",
		{
			"Content-Type": "application/json",
		},
		formData
	).then((data) => {
		return data;
	});
};

export const passwordResetStep2Request = async (formData) => {
	return await requestWithBody(
		passwordResetStep2Url,
		"POST",
		{
			"Content-Type": "application/json",
		},
		formData
	).then((data) => {
		return data;
	});
};

export const signOutRequest = async () => {
	return await requestWithBody(
		signOutUrl,
		"POST",
		{
			"Content-Type": "application/json",
		},
		{
			token: getCookie("refreshToken"),
		}
	).then((data) => {
		deleteCookie("refreshToken");
		deleteCookie("accessToken");
		return data;
	});
};

const requestWithBody = async (url, method, headers, formData) => {
	return await fetch(url, {
		method: method,
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: headers,
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(formData),
	})
		.then((response) => {
			return checkReponseAndGetData(response);
		})
		.catch((data) => {
			return data;
		});
};

const requestGet = async (url, headers) => {
	return await fetch(url, {
		method: "GET",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: headers,
		redirect: "follow",
		referrerPolicy: "no-referrer",
	})
		.then((response) => {
			return checkReponseAndGetData(response);
		})
		.catch((data) => {
			return data;
		});
};
