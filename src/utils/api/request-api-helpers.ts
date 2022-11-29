import { useDispatch } from "react-redux";

export const useAppDispatch: () => any = useDispatch;

export function checkReponseAndGetData(response: Response) {
	return response.ok ? response.json() : Promise.reject(response.status);
}
