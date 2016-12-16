"use strict";

import * as React from "react";
import { Field, reduxForm } from "redux-form";
import close from "../images/close.svg";

const validate = (values) => {
  const errors = {};
  if (!values.image) {
    errors.image = "Image URL required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.image)) {
    errors.image = "Must be valid URL";
  }
  if (!values.title) {
    errors.title = "Title required";
  }
  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{ label }</label>
    <div>
      <input className="pin-input" { ...input } type={ type } />
      { touched && error && <p className="login-error">{ error }</p> }
    </div>
  </div>
);

class Box extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <div className="overlay"></div>
        <div className="light-box">
          <div className="close-box" onClick={ this.props.onHideBox } dangerouslySetInnerHTML={{ __html: close }}></div>
          <div className="img-preview">
            <p>Image Preview</p>
            <img src={ this.props.previewUrl } />
          </div>
          <form className="pin-form" onSubmit={ handleSubmit }>
            <Field component={ renderField } type="text" name="image" label="Image link" />
            <Field component={ renderField } type="text" name="title" label="Title" />
            <Field component={ renderField } type="text" name="address" label="Address" / >
            <Field component={ renderField } type="text" name="event" label="Event link" />
            <label htmlFor="time">How long?</label>
            <Field className="pin-select" name="time" component="select">
              <option value="" disabled></option>
              <option value="<1 hour">&lt;1 hour</option>
              <option value="1-2 hours">1-2 hours</option>
              <option value="2-4 hours">2-4 hours</option>
              <option value="all day">all day</option>
            </Field>
            <button className="login-submit" type="submit" disabled={ pristine || submitting }>Post Event</button>
          </form>
        </div>
      </div>
    );
  }
}

Box.propTypes = {
  onHideBox: React.PropTypes.func,
  previewUrl: React.PropTypes.func
};

const LightBox = reduxForm({
  form: "addPin",
  validate
})(Box);

export default LightBox
