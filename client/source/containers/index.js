"use strict";

import { createStore } from "redux";
import { bucketApp } from "../reducers";

let store = createStore(bucketApp);

export default store;
