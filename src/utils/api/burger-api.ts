import { IRequestData } from "../../services/types/fetch";
import { checkReponseAndGetData } from "./request-api-helpers";
import { requestWithBody } from "../request-api";
import { getCookie } from "../cookie";
import { BASE_API_URL } from "../../services/constants/api-urls";

const getIngredientsUrl = `${BASE_API_URL}/ingredients`;
const setOrderUrl = `${BASE_API_URL}/orders`;

export const getIngredientsData = () =>
	fetch(getIngredientsUrl).then((response) =>
		checkReponseAndGetData(response)
	);

export const setOrderData = async (ids: string) => {
	const requestData: IRequestData<{ ingredients: string }> = {
		url: setOrderUrl,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: getCookie("accessToken") || "",
		},
		formData: { ingredients: ids },
	};

	return await requestWithBody(requestData).then((result) => {
		return result;
	});
};
