import { useEffect, useCallback, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { setCurrentIngredientAction } from "../../services/action-creators/current-ingredient";
import { useDispatch } from "react-redux";
import { Modal } from "../../components/modal/modal";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { MatchParams } from "../../services/types/routing";
import { useSelector } from "../../utils/hooks";

export const IngredientPage = () => {
	const history = useHistory<{ isModal: boolean }>();
	const dispatch = useDispatch();
	const { params } = useRouteMatch<MatchParams>();
	const [isModal] = useState<boolean>(history.location.state?.isModal);

	const ingredients = useSelector((state) => {
		return state.ingredients.items;
	});

	const buns = useSelector((state) => {
		return state.ingredients.buns;
	});

	const currentIngredient = useSelector((state) => {
		return state.currentIngredient;
	});

	const handleCloseModal = useCallback(() => {
		history.replace({ pathname: "/" });
	}, []);

	useEffect(() => {
		if (params.id) {
			const ingredient = [...ingredients, ...buns].find(
				(x) => x._id === params.id
			);
			if (ingredient) {
				dispatch(setCurrentIngredientAction(ingredient));
			}
		}
	}, [ingredients, buns]);

	if (currentIngredient) {
		return (
			<div>
				{isModal ? (
					<Modal
						onClose={handleCloseModal}
						header="Детали ингредиента"
					>
						<IngredientDetails {...currentIngredient} />
					</Modal>
				) : (
					<IngredientDetails {...currentIngredient} />
				)}
			</div>
		);
	} else {
		return null;
	}
};
