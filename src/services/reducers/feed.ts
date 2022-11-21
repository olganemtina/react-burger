import { number } from "prop-types";
import { TWsFeedAction } from "../action-creators/feed";

import { CFeedItem } from "../types/feed";

export interface IInitalFeedState {
	connected: boolean;
	orders: ReadonlyArray<CFeedItem>;
	total: number | null;
	totalToday: number | null;
	message: string | null;
}

const initalFeedState: IInitalFeedState = {
	connected: false,
	orders: [],
	total: null,
	totalToday: null,
	message: null,
};

export default function feedReducer(
	state = initalFeedState,
	action: TWsFeedAction
): IInitalFeedState {
	switch (action.type) {
		case "WS_FEED_CONNECTION_SUCCESS":
			return {
				...state,
				connected: true,
			};
		case "WS_FEED_GET_MESSAGE":
			return {
				...state,
				orders: [...action.payload.orders],
				total: action.payload.total,
				totalToday: action.payload.totalToday,
			};
		case "WS_FEED_CONNECTION_CLOSED": {
			return {
				...state,
				message: action.payload,
				connected: false,
			};
		}
		case "WS_FEED_CONNECTION_ERROR": {
			return {
				...state,
				message: `ошибка, тип события ${action.payload.type}`,
			};
		}
		default:
			return state;
	}
}
