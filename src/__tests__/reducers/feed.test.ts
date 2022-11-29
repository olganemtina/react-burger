import { TWsFeedAction } from "../../services/action-creators/feed";
import { TOrderAction } from "../../services/action-creators/order";
import * as types from "../../services/action-types/feed";
import { CFeedItem, IFeed } from "../../services/types/feed";
import feedReducer, { initalFeedState } from "../../services/reducers/feed";
import { OrderStatus } from "../../services/types/status";

const orders: ReadonlyArray<CFeedItem> = [
	{
		_id: "1",
		createdAt: "2022-11-24",
		ingredients: ["11111", "22222"],
		name: "name",
		number: 55,
		status: OrderStatus.created,
		updatedAt: "2022-11-24",
	} as CFeedItem,
];

const newFeed: IFeed = {
	orders: orders,
	success: true,
	total: 100,
	totalToday: 50,
};

describe("feed reducer", () => {
	it("Testing initial feed state", () => {
		expect(feedReducer(undefined, {} as TWsFeedAction)).toEqual({
			connected: false,
			orders: [],
			total: null,
			totalToday: null,
			message: null,
		});
	});

	it("should handle WS_FEED_CONNECTION_SUCCESS", () => {
		expect(
			feedReducer(initalFeedState, {
				type: types.WS_FEED_CONNECTION_SUCCESS,
			})
		).toEqual({
			...initalFeedState,
			connected: true,
		});
	});

	it("should handle WS_FEED_GET_MESSAGE", () => {
		expect(
			feedReducer(initalFeedState, {
				type: types.WS_FEED_GET_MESSAGE,
				payload: newFeed,
			})
		).toEqual({
			...initalFeedState,
			orders: [...newFeed.orders],
			total: newFeed.total,
			totalToday: newFeed.totalToday,
		});
	});

	it("should handle WS_FEED_CONNECTION_CLOSED", () => {
		expect(
			feedReducer(initalFeedState, {
				type: types.WS_FEED_CONNECTION_CLOSED,
				payload: "Closed",
			})
		).toEqual({
			...initalFeedState,
			message: "Closed",
			connected: false,
		});
	});

	it("should handle WS_FEED_CONNECTION_ERROR", () => {
		const event = new Event("build");
		expect(
			feedReducer(initalFeedState, {
				type: types.WS_FEED_CONNECTION_ERROR,
				payload: event,
			})
		).toEqual({
			...initalFeedState,
			message: `ошибка, тип события ${event.type}`,
		});
	});
});
