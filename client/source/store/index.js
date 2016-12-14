"use strict";

import { applyMiddleware, createStore, combineReducers } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import promise from "redux-promise";
import createLogger from "redux-logger";
import { reducer as formReducer } from "redux-form";
import { loadState, saveState } from "../localstorage";
import debounce from "lodash/debounce";

const persistedState = loadState();
const logger = createLogger();

let store = createStore(rootReducer, persistedState, applyMiddleware(thunk, promise));

store.subscribe(debounce(() => {
  saveState(store.getState());
}, 1000));

export default store;
