const getIngredientsUrl = "https://norma.nomoreparties.space/api/ingredients";
const setOrderUrl = "https://norma.nomoreparties.space/api/orders";

export const getIngredientsData = () =>
	fetch(getIngredientsUrl).then((response) => response.json());

export const setOrderData = (ids) => {
	return fetch(setOrderUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ingredients: ids }),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data;
		});
};
