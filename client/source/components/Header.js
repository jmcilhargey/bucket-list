"use strict";

import React from "react";
import { Link } from "react-router";
import bucket from "../images/bucket.svg";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const isLogin = this.props.isLogin;
    return (
      <div className="header-container">
        <div className="header-title">
          <Link to="/">BucketList<span dangerouslySetInnerHTML={{ __html: bucket }}></span></Link>
        </div>
        <div className="header-selection">
          <Link to="" onClick={ this.props.onShowBox }>Add</Link>
          { !isLogin ?
            <div className="header-login">
              <Link to="/login">Login</Link>
              <Link to="/register">Signup</Link>
            </div>
          : <Link to="" onClick={ this.props.onLogout }>Logout</Link> }
          <Link to="/search">Search</Link>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  isLogin: React.PropTypes.bool,
  onShowBox: React.PropTypes.func,
  onLogout: React.PropTypes.func
};

export default Header
