"use strict";

import * as React from "react";
import { Field, reduxForm } from "redux-form";
import facebook from "../images/facebook.svg";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Username required";
  } else if (values.username.length < 3) {
    errors.username = "Username must be at least 3 characters long";
  }
  if (!values.email) {
    errors.email = "Email required"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(values.password)) {
    errors.password = "Password must be 7 or more characters, contain a digit, and a special character";
  }
  if (values.password !== values.confirm) {
    errors.confirm = "Passwords do not match";
  }
  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{ label }</label>
    <div>
      <input className="register-input" { ...input } type={ type } />
      { touched && error && <p className="register-error">{ error }</p> }
    </div>
  </div>
);

class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="register-container">
        <form className="register-form" onSubmit={ handleSubmit }>
          <Field component={ renderField } type="text" name="username" label="Username" />
          <Field component={ renderField } type="email" name="email" label="Email" />
          <Field component={ renderField } type="password" name="password" label="Password" />
          <Field component={ renderField } type="password" name="confirm" label="Confirm" />
          <button className="register-submit" type="submit" disabled={ pristine || submitting }>Sign Up</button>
        </form>
        <button className="facebook-btn">Register With <span dangerouslySetInnerHTML={{ __html: facebook }}></span></button>
      </div>
    );
  }
}

const RegisterForm = reduxForm({
  form: "register",
  validate
})(Form);

export default RegisterForm
