export function checkReponseAndGetData(response: Response) {
	return response.ok ? response.json() : Promise.reject(response.status);
}
