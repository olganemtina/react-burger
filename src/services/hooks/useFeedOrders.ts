import { useSelector } from "../../utils/hooks";
import { IInitalFeedState } from "../reducers/feed";
import { RootState } from "../types";
import { FeedItemWithIngredients } from "../types/feed";

export const useFeedOrders = (
	getReducerState: (x: RootState) => IInitalFeedState
) => {
	const { orders, total, totalToday } = useSelector((state) => {
		const ingredients = [
			...state.ingredients.items,
			...state.ingredients.buns,
		];
		const feed = getReducerState(state);
		const model = feed.orders.map((order) => {
			const result = new FeedItemWithIngredients(order);
			result.setIngredients(ingredients);
			return result;
		});
		return {
			orders: model,
			total: feed.total,
			totalToday: feed.totalToday,
		};
	});
	return { orders, total, totalToday };
};
