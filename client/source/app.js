"use strict";

import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import routes from "./routes"
import { Provider } from "react-redux";
import store from "./containers";

import "style!./main.css";

render(
  <Provider store={ store }>
    <Router history={ browserHistory } routes={ routes }></Router>
  </Provider>,
  document.getElementById("app"));
