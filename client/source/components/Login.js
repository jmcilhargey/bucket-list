"use strict";

import * as React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.isValidSubmit = this.isValidSubmit.bind(this);
  }
  isValidSubmit() {
    const errors = [];

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.props.email)) {
      errors.push("Invalid email address");
    }
    if (errors.length) {
      this.props.onError(errors);
      return false;
    } else {
      this.props.onError();
      return true;
    }
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.isValidSubmit()) {
      this.props.onSubmit();
      this.refs.email.value = "";
      this.refs.password.value = "";
    }
  }
  onEmailChange(event) {
    this.props.onEmailChange(event.target.value);
  }
  onPasswordChange(event) {
    this.props.onPasswordChange(event.target.value);
  }
  render() {
    return (
      <form className="login-form" onSubmit={ this.onSubmit }>
        <label htmlFor="email">Email</label>
        <input className="login-input" onChange={ this.onEmailChange } type="email" ref="email" />
        <label htmlFor="password">Password</label>
        <input className="login-input" onChange={ this.onPasswordChange } type="password" ref="password" />
        <input className="login-submit" type="submit" value="Sign In"/>
      </form>
    );
  }
}

export default Login
