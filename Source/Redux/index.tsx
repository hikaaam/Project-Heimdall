import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./Reducers";

const reducers = combineReducers(rootReducer);

export const store = createStore(reducers, applyMiddleware(thunk));
