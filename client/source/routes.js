"use strict";

import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import App from "./components/app";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import Settings from "./components/settings";

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="/register" component={ Register } />
    <Route path="/login" component={ Login } />
  </Route>
);
