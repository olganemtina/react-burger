import { FC, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { startConnectionAction } from "../../services/action-creators/feed";
import {
	ordersAllWsUrl,
	ordersUserWsUrl,
} from "../../services/constants/web-socket";
import { useAppDispatch } from "../../services/hooks/use-app-dispatch";
import { useAppSelector } from "../../services/hooks/use-app-selector";
import { FeedItemWithIngredients } from "../../services/types/feed";
import { OrderStatus } from "../../services/types/status";
import { classNames } from "../../utils/class-names";
import { getCookie } from "../../utils/cookie";
import { AppDataWithCurrency } from "../app-price/app-price";
import { IngredientRaw } from "../ingredient-row/ingredient-row";
import style from "./feed-details.module.scss";

const statusClassName = (status: string) => {
	return classNames(
		"mb-15",
		"text text_type_main-default",
		status == OrderStatus.done ? "feed_state_active" : ""
	);
};

export const FeedDetails: FC = () => {
	const dispatch = useAppDispatch();
	const history = useHistory<{ from: string }>();
	const { id } = useParams<{ id: string }>();

	const feed = useAppSelector((state) => {
		return state.feed;
	});

	const ingredients = useAppSelector((state) => {
		return [...state.ingredients.buns, ...state.ingredients.items];
	});

	const [currentFeed, setCurrentFeed] = useState<FeedItemWithIngredients>();

	const refScroll = useRef<HTMLDivElement>(null);
	const refNotScroll = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ingredientsCount = currentFeed?.ingredientsData?.length || 0;
		if (refScroll.current && ingredientsCount > 0) {
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
	}, [refScroll.current, currentFeed?.ingredientsData]);

	useEffect(() => {
		if (!feed.connected) {
			const url = (
				history.location.state?.from || history.location.pathname
			)
				.slice(1)
				.split("/")[0];
			let wsUrl = ordersAllWsUrl;
			if (url == "profile") {
				const accessToken = getCookie("accessToken")?.replace(
					"Bearer ",
					""
				);
				wsUrl = `${ordersUserWsUrl}?token=${accessToken}`;
			}
			dispatch(startConnectionAction(wsUrl));
		}
	}, [feed.connected]);

	useEffect(() => {
		if (feed.connected) {
			let result = feed.orders.find((x) => x._id === id);
			if (result) {
				let orderWithIngredients = new FeedItemWithIngredients(
					result
				);
				orderWithIngredients.setIngredients(ingredients);
				setCurrentFeed(orderWithIngredients);
			}
		}
	}, [feed.connected, feed.orders]);

	if (currentFeed) {
		return (
			<div>
				<div ref={refNotScroll}>
					<div className="text text_type_digits-default mb-10 text_align_center">
						#{currentFeed.number}
					</div>
					<div className="text text_type_main-medium mb-3">
						{currentFeed.name}
					</div>
					<div className={statusClassName(currentFeed.status)}>
						{currentFeed.statusCaption}
					</div>
					<div className="text text_type_main-medium mb-6">
						Состав:
					</div>
				</div>
				<div ref={refScroll} className={style.scroll_container}>
					{currentFeed.ingredientsData.map(
						({ ingredient, count }, index) => {
							return (
								<div key={`${ingredient._id}${index}`}>
									<IngredientRaw
										text={ingredient.name}
										count={count}
										price={ingredient.price}
										thumbnail={
											ingredient.image_mobile
										}
									/>
								</div>
							);
						}
					)}
				</div>
				<div className="display_flex display_flex_space_between mt-10">
					<div className="text text_type_main-default text_color_inactive">
						{currentFeed.howDaysAgo}
					</div>
					<AppDataWithCurrency data={currentFeed.totalPrice} />
				</div>
			</div>
		);
	}
	return null;
};
