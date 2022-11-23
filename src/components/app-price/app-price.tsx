import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";

export const AppDataWithCurrency: FC<{ data: number | string }> = ({
	data,
}) => {
	return (
		<div className="inline-flex text text_type_digits-default">
			{data}
			<span className="pl-2">
				<CurrencyIcon type="primary" />
			</span>
		</div>
	);
};
