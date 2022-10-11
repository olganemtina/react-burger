import { rootReducer } from "./reducers/root-reducer";
import thunk from "redux-thunk";
import { compose, createStore, applyMiddleware } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);
export default store;
