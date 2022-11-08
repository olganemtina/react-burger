import { IRequestData } from "../models/fetch";
import { checkReponseAndGetData } from "./helpers";
import { requestWithBody } from "./request-api";

const getIngredientsUrl = "https://norma.nomoreparties.space/api/ingredients";
const setOrderUrl = "https://norma.nomoreparties.space/api/orders";

export const getIngredientsData = () =>
	fetch(getIngredientsUrl).then((response) =>
		checkReponseAndGetData(response)
	);

export const setOrderData = async (ids: string) => {
	const requestData: IRequestData<string> = {
		url: setOrderUrl,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		formData: JSON.stringify({ ingredients: ids })
	};

	return await requestWithBody(requestData).then((result) => {
		return result;
	});
};
