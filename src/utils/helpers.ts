import { useDispatch } from "react-redux";

export const useAppDispatch: () => any = useDispatch;

export function checkReponseAndGetData (response: Response) {
	return response.ok
		? response.json()
		: response.json().then((err: any) => Promise.reject(err));
};