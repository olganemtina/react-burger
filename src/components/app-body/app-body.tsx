import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";

export const AppBody = () => {
	return (
		<main className="display_flex">
			<DndProvider backend={HTML5Backend}>
				<div className="width_50_percent">
					<BurgerIngredients />
				</div>
				<div className="mt-25 ml-10">
					<BurgerConstructor />
				</div>
			</DndProvider>
		</main>
	);
};
