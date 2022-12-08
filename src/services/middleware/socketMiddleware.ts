import { Middleware, MiddlewareAPI } from "redux";
import type { AppDispatch, RootState } from "../types";
import { IFeed } from "../types/feed";
import { wsActionsFeed } from "../constants/web-socket";

export type TWsAction = {
	[item in keyof typeof wsActionsFeed]: typeof wsActionsFeed[item];
};

export type TDataMessage = IFeed;

export function socketMiddleware(wsActions: typeof wsActionsFeed): Middleware {
	return (store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		let socketOpened = false;
		const { dispatch, getState } = store;
		const user = getState().user;
		return (next) => (action) => {
			const { type } = action;
			if (type === wsActions.wsInit) {
				const url = action.url;
				socket = new WebSocket(url);
			}
			if (socket) {
				socket.onopen = (event: Event) => {
					dispatch({ type: wsActions.onOpen });
					socketOpened = true;
				};

				socket.onerror = (event) => {
					dispatch({ type: wsActions.onError, payload: event });
				};

				socket.onmessage = (event: MessageEvent) => {
					const { data } = event;
					const parsedData = JSON.parse(data) as IFeed & {
						message: string;
					};
					if (parsedData.success) {
						dispatch({
							type: wsActions.onMessage,
							payload: parsedData,
						});
					} else {
						dispatch({
							type: wsActions.onClose,
							payload: parsedData.message,
						});
					}
				};

				socket.onclose = (event: CloseEvent) => {
					if (socketOpened) {
						dispatch({
							type: wsActions.onClose,
							payload: event.reason,
						});
					} else {
						console.log(
							`ws with url=${socket?.url} is closed`
						);
					}
				};

				if (type === wsActions.wsSendMessage) {
					const message = {
						...action.payload,
						token: user.data,
					};
					socket.send(JSON.stringify(message));
				}

				if (type === wsActions.onClose) {
					socket.close();
					socketOpened = false;
				}
			}
			next(action);
		};
	};
}
