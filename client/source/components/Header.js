"use strict";

import React from "react";
import { Link } from "react-router";
import bucket from "../images/bucket.svg";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header-container">
        <div className="header-title">
          <Link to="/">BucketList<span dangerouslySetInnerHTML={{ __html: bucket }}></span></Link>
        </div>
        <div className="header-selection">
          <Link to="" onClick={ this.props.onShowBox }>Add</Link>
          <Link to="/register">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/search">Search</Link>
        </div>
      </div>
    );
  }
}

export default Header
