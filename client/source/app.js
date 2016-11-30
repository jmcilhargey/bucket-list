"use strict";

import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import routes from "./routes"

import "style!./main.css";

render(<Router history={ browserHistory } routes={ routes }></Router>,
  document.getElementById("app"));
