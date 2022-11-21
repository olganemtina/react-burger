import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { TWsFeedAction } from "./action-creators/feed";
import { TOrderAction } from "./action-creators/order";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { rootReducer } from "./reducers/root-reducer";
import { IFeed } from "./types/feed";
import {
	ordersAllWsUrl,
	ordersUserWsUrl,
	wsActionsFeed,
} from "./variables/web-socket";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActionsFeed)))
);
export default store;
