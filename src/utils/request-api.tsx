import { IRequestData } from "../models/fetch";
import { checkReponseAndGetData } from "./helpers";

export async function requestWithBody<T>({url, method, headers, formData}: IRequestData<T>) {
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
		.then((response: Response) => {
			return checkReponseAndGetData(response);
		})
		.catch((data) => {
			return data;
		});
};



export const requestGet = async (url: string, headers: Record<string, string>) => {
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