"use strict";

import * as React from "react";
import LoginForm from "./loginform";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendLoginData, receiveUser } from "../actions";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  handleLogin(values) {
    this.props.sendLoginData(values);
  }
  render() {
    console.log(this.props.userData);
    return (
      <LoginForm onSubmit={ this.handleLogin.bind(this) }/>
    );
  }
}

const mapStateToProps = (state) => {
  const { registerUser, loginUser } = state
  return {
    userData: loginUser.userData,
    isRegistering: registerUser.isRegistering
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    sendLoginData: sendLoginData,
    receiveUser: receiveUser
  }, dispatch);
}

const RegisterView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterView;
