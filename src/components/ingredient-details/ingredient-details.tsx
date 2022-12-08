import { FC, useEffect } from "react";
import { useParams } from "react-router";
import { setCurrentIngredientAction } from "../../services/action-creators/current-ingredient";
import { useAppDispatch } from "../../services/hooks/use-app-dispatch";
import { useAppSelector } from "../../services/hooks/use-app-selector";
import { IIngredientDetails } from "../../services/types/ingredient";

export const IngredientDetails: FC = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const currentIngredient = useAppSelector((state) => {
		return state.currentIngredient;
	});

	const ingredients = useAppSelector((state) => {
		return [...state.ingredients.buns, ...state.ingredients.items];
	});
	useEffect(() => {
		if (!currentIngredient) {
			const ingredient = ingredients.find(
				(ingredient) => ingredient._id === id
			);
			if (ingredient) {
				dispatch(setCurrentIngredientAction(ingredient));
			}
		}
	}, [id, currentIngredient, ingredients]);
	if (currentIngredient) {
		return (
			<div className="text_align_center">
				<img src={currentIngredient.image_large} />
				<div
					data-testid="modal-current-ingredient-name"
					className="text text_type_main-medium mt-4"
				>
					{currentIngredient.name}
				</div>
				<div className="display_flex display_flex-center text text_type_main-default text_color_inactive mt-8">
					<div className="pr-5">
						Калории, ккал <br /> {currentIngredient.calories}
					</div>
					<div className="pr-5">
						Белки, г <br /> {currentIngredient.proteins}
					</div>
					<div className="pr-5">
						Жиры, г <br /> {currentIngredient.fat}
					</div>
					<div className="pr-5">
						Углеводы, г <br />{" "}
						{currentIngredient.carbohydrates}
					</div>
				</div>
			</div>
		);
	}
	return null;
};
