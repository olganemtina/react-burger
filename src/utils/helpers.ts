import { useDispatch } from "react-redux";

export const useAppDispatch: () => any = useDispatch;

export const checkReponseAndGetData = (response: any) => {
	return response.ok
		? response.json()
		: response.json().then((err: any) => Promise.reject(err));
};