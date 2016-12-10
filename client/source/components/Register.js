"use strict";

import * as React from "react";
import RegisterForm from "./registerform";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendUserData, receiveUser } from "../actions";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  handleRegister(values) {
    this.props.sendUserData(values);
  }
  render() {
    console.log(this.props.userData);
    return (
      <RegisterForm onSubmit={ this.handleRegister.bind(this) }/>
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
    sendUserData: sendUserData,
    receiveUser: receiveUser
  }, dispatch);
}

const RegisterView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterView;
