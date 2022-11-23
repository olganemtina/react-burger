import {
	WS_FEED_CONNECTION_CLOSED,
	WS_FEED_CONNECTION_ERROR,
	WS_FEED_CONNECTION_START,
	WS_FEED_CONNECTION_SUCCESS,
	WS_FEED_GET_MESSAGE,
	WS_FEED_SEND_MESSAGE,
} from "../action-types/feed";
import { CFeedItem, IFeed } from "../types/feed";

export interface IStartFeedConnectionAction {
	type: typeof WS_FEED_CONNECTION_START;
	url: string;
}

export interface IGetFeedOpenConnectionAction {
	type: typeof WS_FEED_CONNECTION_SUCCESS;
}

export interface ISetFeedAction {
	type: typeof WS_FEED_GET_MESSAGE;
	payload: IFeed;
}

export interface ICloseFeedConnectionAction {
	type: typeof WS_FEED_CONNECTION_CLOSED;
	payload: string;
}

export interface IErrorFeedConnectionAction {
	type: typeof WS_FEED_CONNECTION_ERROR;
	payload: Event;
}

export interface ISendFeedMessageAction {
	type: typeof WS_FEED_SEND_MESSAGE;
	payload: CFeedItem;
}

export const startConnectionAction = (
	url: string
): IStartFeedConnectionAction => {
	return {
		type: WS_FEED_CONNECTION_START,
		url: url,
	};
};

export const getOpenConnectionAction = (): IGetFeedOpenConnectionAction => {
	return {
		type: WS_FEED_CONNECTION_SUCCESS,
	};
};

export const setOrdersAction = (data: IFeed): ISetFeedAction => {
	return {
		type: WS_FEED_GET_MESSAGE,
		payload: data,
	};
};

export const closeFeedConnectionAction = (
	message: string
): ICloseFeedConnectionAction => {
	return {
		type: WS_FEED_CONNECTION_CLOSED,
		payload: message,
	};
};

export const errorFeedConnectionAction = (
	data: Event
): IErrorFeedConnectionAction => {
	return {
		type: WS_FEED_CONNECTION_ERROR,
		payload: data,
	};
};

export const sendFeedMessageAction = (
	data: CFeedItem
): ISendFeedMessageAction => {
	return {
		type: WS_FEED_SEND_MESSAGE,
		payload: data,
	};
};

export type TWsFeedAction =
	| IGetFeedOpenConnectionAction
	| ISetFeedAction
	| IStartFeedConnectionAction
	| ICloseFeedConnectionAction
	| IErrorFeedConnectionAction
	| ISendFeedMessageAction;
