import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { rootReducer } from "./reducers/root-reducer";
import { wsActionsFeed } from "./constants/web-socket";

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
