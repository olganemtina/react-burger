import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { useDrag } from "react-dnd";
import { IIngredientDetails } from "../../services/types/ingredient";
import { AppDataWithCurrency } from "../app-price/app-price";

interface IBurgerIngredient {
	count: number;
	id: string;
	caption: string;
	description: string;
	imgSrc: string;
	handleOpenModal: (event: React.MouseEvent<HTMLElement>) => void;
}

export const BurgerIngredient: FC<IBurgerIngredient> = ({
	count,
	imgSrc,
	description,
	caption,
	handleOpenModal,
	id,
}) => {
	const [, dragRef] = useDrag({
		type: "ingredient",
		item: { id: id },
	});

	return (
		<div
			draggable
			ref={dragRef}
			className="mb-8 position_relative"
			onClick={handleOpenModal}
		>
			{count > 0 && <Counter count={count} size="default" />}
			<div className="text_align_center pl-4 pr-4">
				<img src={imgSrc} alt="" />
			</div>
			<div className="text text_type_digits-default pt-1 pb-1 text_align_center">
				<AppDataWithCurrency data={description} />
			</div>
			<div className="text_align_center text text_type_main-default">
				{caption}
			</div>
		</div>
	);
};
