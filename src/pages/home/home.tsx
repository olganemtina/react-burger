import { useEffect } from "react";
import { AppBody } from "../../components/app-body/app-body";
import { AppError } from "../../components/app-error/app-error";
import { AppLoad } from "../../components/app-load/app-load";
import { getIngredients } from "../../services/action-types/burger-ingredients";
import { useAppDispatch } from "../../services/hooks/use-app-dispatch";
import { useAppSelector } from "../../services/hooks/use-app-selector";

export const HomePage = () => {
	const { ingredientsRequestFailed, ingredientsRequest, error } =
		useAppSelector((state) => {
			return state.ingredients;
		});
	return (
		<div>
			{ingredientsRequestFailed ? (
				<AppError error={error} />
			) : ingredientsRequest ? (
				<AppLoad text="Идет загрузка данных..." />
			) : (
				<AppBody />
			)}
		</div>
	);
};
