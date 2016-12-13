"use strict";

import * as React from "react";
import { Field, reduxForm } from "redux-form";
import facebook from "../images/facebook.svg";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Username required";
  }
  if (!values.password) {
    errors.password = "Password required";
  }
  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{ label }</label>
    <div>
      <input className="login-input" { ...input } type={ type } />
      { touched && error && <p className="login-error">{ error }</p> }
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
      <div className="login-container">
        <form className="login-form" onSubmit={ handleSubmit }>
          <Field component={ renderField } type="text" name="username" label="Username" />
          <Field component={ renderField } type="password" name="password" label="Password" />
          <button className="login-submit" type="submit" disabled={ pristine || submitting }>Sign In</button>
        </form>
        <button onClick={ this.props.onClick } className="facebook-btn">Register With <span dangerouslySetInnerHTML={{ __html: facebook }}></span></button>
      </div>
    );
  }
}

const LoginForm = reduxForm({
  form: "register",
  validate
})(Form);

export default LoginForm
