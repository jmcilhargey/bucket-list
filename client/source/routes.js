"use strict";

import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import App from "./containers/app";
import Home from "./containers/home";
import Register from "./containers/register";
import Login from "./containers/login";
import Settings from "./containers/settings";

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="/register" component={ Register } />
    <Route path="/login" component={ Login } />
  </Route>
);
