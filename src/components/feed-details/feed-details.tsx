import { FC, useEffect, useRef } from "react";
import { FeedItemWithIngredients } from "../../services/types/feed";
import { OrderStatus } from "../../services/types/status";
import { classNames } from "../../utils/class-names";
import { AppDataWithCurrency } from "../app-price/app-price";
import { IngredientRaw } from "../ingredient-row/ingredient-row";
import style from "./feed-details.module.scss";

export const FeedDetails: FC<{ order: FeedItemWithIngredients }> = ({
	order,
}) => {
	const statusClassName = classNames(
		"mb-15",
		"text text_type_main-default",
		order.status == OrderStatus.done ? "feed_state_active" : ""
	);
	const refScroll = useRef<HTMLDivElement>(null);
	const refNotScroll = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (refScroll.current) {
			if (
				refScroll.current.offsetHeight >=
				window.innerHeight -
					220 -
					(refNotScroll.current?.offsetHeight || 0)
			) {
				refScroll.current.setAttribute(
					"style",
					"height: 400px; padding-right:10px"
				);
			} else {
				refScroll.current.removeAttribute("style");
			}
		}
	}, []);

	return (
		<div>
			<div ref={refNotScroll}>
				<div className="text text_type_digits-default mb-10 text_align_center">
					#{order.number}
				</div>
				<div className="text text_type_main-medium mb-3">
					{order.name}
				</div>
				<div className={statusClassName}>{order.statusCaption}</div>
				<div className="text text_type_main-medium mb-6">
					Состав:
				</div>
			</div>
			<div ref={refScroll} className={style.scroll_container}>
				{order.ingredientsData.map((ingredient, index) => {
					return (
						<div key={`${ingredient._id}${index}`}>
							<IngredientRaw
								text={ingredient.name}
								price={ingredient.price}
								thumbnail={ingredient.image_mobile}
							/>
						</div>
					);
				})}
			</div>
			<div className="display_flex display_flex_space_between mt-10">
				<div className="text text_type_main-default text_color_inactive">
					{order.howDaysAgo}
				</div>
				<AppDataWithCurrency data={order.totalPrice} />
			</div>
		</div>
	);
};
