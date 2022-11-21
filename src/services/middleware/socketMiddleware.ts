import { useDispatch } from "react-redux";
import { Middleware, MiddlewareAPI } from "redux";
import {
	closeFeedConnectionAction,
	errorFeedConnectionAction,
	getOpenConnectionAction,
	setOrdersAction,
	TWsFeedAction,
} from "../action-creators/feed";
import { WS_FEED_SEND_MESSAGE } from "../action-types/feed";
import type { AppDispatch, RootState } from "../types";
import { IFeed } from "../types/feed";
import { wsActionsFeed } from "../variables/web-socket";

export type TWsAction = {
	[item in keyof typeof wsActionsFeed]: typeof wsActionsFeed[item];
};

export type TDataMessage = IFeed;

export function socketMiddleware(wsActions: TWsAction): Middleware {
	return (store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		const { dispatch, getState } = store;
		const user = getState().user;
		return (next) => (action: TWsFeedAction) => {
			const { type } = action;
			if (type === wsActions.wsInit) {
				const url = action.url;
				socket = new WebSocket(url);
			}
			if (socket) {
				socket.onopen = (event: Event) => {
					dispatch(getOpenConnectionAction());
				};

				socket.onerror = (event) => {
					dispatch(errorFeedConnectionAction(event));
				};

				socket.onmessage = (event: MessageEvent) => {
					const { data } = event;
					const parsedData = JSON.parse(data) as IFeed & {
						message: string;
					};
					if (parsedData.success) {
						dispatch(setOrdersAction(parsedData));
					} else {
						dispatch(
							closeFeedConnectionAction(parsedData.message)
						);
					}
				};

				socket.onclose = (event: CloseEvent) => {
					dispatch(closeFeedConnectionAction(event.reason));
				};

				if (type === WS_FEED_SEND_MESSAGE) {
					const message = {
						...action.payload,
						token: user.data,
					};
					socket.send(JSON.stringify(message));
				}
			}
			next(action);
		};
	};
}
