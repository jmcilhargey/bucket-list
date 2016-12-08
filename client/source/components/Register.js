"use strict";

import * as React from "react";
import RegisterForm from "./registerform";

const showResult = (values) => {
  console.log(values);
}

class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <RegisterForm onSubmit={ showResult }/>
    );
  }
}

export default Register
