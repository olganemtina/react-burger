import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { AppAvatar, IAppAvatar } from "../app-avatar/app-avatar";

export interface IIngredientRaw {
	text: string;
	price: number;
	thumbnail: string;
}

export const IngredientRaw: FC<IIngredientRaw> = ({
	text,
	price,
	thumbnail,
}) => {
	return (
		<div className="constructor-element__row pt-4 pb-4">
			<AppAvatar imgUrl={thumbnail} />
			<span className="constructor-element__text text text_type_main-default pl-4">
				{text}
			</span>
			<span className="constructor-element__price text text_type_digits-default">
				{price}
				<CurrencyIcon type="primary" />
			</span>
		</div>
	);
};
