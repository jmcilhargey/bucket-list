"use strict";

import React from "react";
import { Link } from "react-router";

class Header extends React.Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-title">
          <Link to="/">BucketList SF</Link>
        </div>
        <div className="header-selection">
          <Link to="/register">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/search">Search</Link>
        </div>
      </div>
    );
  }
}

export default Header
