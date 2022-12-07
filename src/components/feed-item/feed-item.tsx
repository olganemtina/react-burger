import { FC, useCallback, useMemo } from "react";
import { FeedItemWithIngredients } from "../../services/types/feed";
import { OrderStatus } from "../../services/types/status";
import { classNames } from "../../utils/class-names";
import { AppAvatarList } from "../app-avatar-list/app-avatar-list";
import { AppDataWithCurrency } from "../app-price/app-price";

export const FeedItem: FC<{
	order: FeedItemWithIngredients;
	showStatus?: boolean;
	openModal: () => void;
}> = ({ order, showStatus = false, openModal }) => {
	const openModalHandler = useCallback(() => {
		openModal();
	}, []);
	const statusClassName = classNames(
		"pt-2",
		order.status == OrderStatus.done ? "feed_state_active" : ""
	);

	const items = useMemo(() => {
		return order.ingredientsData.map((x) => x.ingredient);
	}, [order.ingredientsData]);

	return (
		<div
			onClick={openModalHandler}
			className="constructor-element display_block mb-4 max-width-100 pb-6 pt-6"
		>
			<div className="display_flex mb-6 display_flex_space_between">
				<div className="text text_type_digits-default">
					#{order.number}
				</div>
				<div className="text text_type_main-default text_color_inactive">
					{order.howDaysAgo}
				</div>
			</div>
			<div className="pb-6">
				<div className="text text_type_main-medium">
					{order.name}
				</div>
				{showStatus && (
					<div className={statusClassName}>
						{order.statusCaption}
					</div>
				)}
			</div>
			<div className="display_flex display_flex_space_between">
				<AppAvatarList items={items} showCount={3} />
				<div className="text text_type_digits-default">
					<AppDataWithCurrency data={order.totalPrice} />
				</div>
			</div>
		</div>
	);
};
