import { state } from "./reducer";
import { combineReducers } from "redux";
import { createStore } from "redux";

const rootReducer = combineReducers({
  state,
});

export const store = createStore(rootReducer);
