"use strict";

import { applyMiddleware, createStore, combineReducers } from "redux";
import { bucketApp } from "../reducers";
import thunk from "redux-thunk";
import promise from "redux-promise";
import createLogger from "redux-logger";
import { reducer as formReducer } from "react-form";

const reducers = {
  bucketApp,
  form: formReducer
}
const reducer = combineReducers(reducers);

let logger = createLogger();
let store = createStore(reducer, applyMiddleware(thunk, promise, logger));

export default store;
