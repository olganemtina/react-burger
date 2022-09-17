const getIngredientsUrl = "https://norma.nomoreparties.space/api/ingredients";

export const getIngredientsData = () =>
	fetch(getIngredientsUrl).then((response) => response.json());
