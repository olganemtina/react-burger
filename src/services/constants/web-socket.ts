import { getCookie } from "../../utils/cookie";
import {
	WS_FEED_CONNECTION_CLOSED,
	WS_FEED_CONNECTION_ERROR,
	WS_FEED_CONNECTION_START,
	WS_FEED_CONNECTION_SUCCESS,
	WS_FEED_GET_MESSAGE,
	WS_FEED_SEND_MESSAGE,
} from "../action-types/feed";

export const ordersAllWsUrl = "wss://norma.nomoreparties.space/orders/all";
export const ordersUserWsUrl = `wss://norma.nomoreparties.space/orders`;

export const wsActionsFeed = {
	wsInit: WS_FEED_CONNECTION_START,
	onOpen: WS_FEED_CONNECTION_SUCCESS,
	onMessage: WS_FEED_GET_MESSAGE,
	onClose: WS_FEED_CONNECTION_CLOSED,
	onError: WS_FEED_CONNECTION_ERROR,
	wsSendMessage: WS_FEED_SEND_MESSAGE,
};
