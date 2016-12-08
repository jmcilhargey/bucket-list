"use strict";

import { applyMiddleware, createStore, combineReducers } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import promise from "redux-promise";
import createLogger from "redux-logger";
import { reducer as formReducer } from "redux-form";

let logger = createLogger();
let store = createStore(rootReducer, applyMiddleware(thunk, promise));

export default store;
