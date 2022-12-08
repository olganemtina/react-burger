import { IRequestData, TRequestMethod } from "../services/types/fetch";
import { checkReponseAndGetData } from "./api/request-api-helpers";

export async function request(url: string, options: RequestInit) {
	return await fetch(url, options)
		.then(checkReponseAndGetData)
		.catch((data) => data);
}

export async function requestWithBody<T>({
	url,
	method,
	headers,
	formData,
}: IRequestData<T>) {
	return await request(url, {
		method: method,
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: headers,
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(formData),
	});
}

export const requestGet = async (
	url: string,
	headers: Record<string, string>
) => {
	return await request(url, {
		method: "GET",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: headers,
		redirect: "follow",
		referrerPolicy: "no-referrer",
	});
};
