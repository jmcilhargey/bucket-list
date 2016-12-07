"use strict";

import React from "react";
import close from "../images/close.svg";

class LightBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="overlay"></div>
        <div className="light-box">
          <div className="close-box" onClick={ this.props.onNewPost } dangerouslySetInnerHTML={{ __html: close }}></div>
          <div className="img-preview">
            <p>Image Preview</p>
            <img src={ this.props.url } />
          </div>
          <form className="pin-form">
            <label htmlFor="url">Image Url</label>
            <input className="pin-input" onChange={ this.props.onChangeUrl } type="text" ref="url" />
            <label htmlFor="title">Title</label>
            <input className="pin-input" ref="title" />
            <label htmlFor="event">Event Url (Opt)</label>
            <input className="pin-input" ref="event" />
            <label htmlFor="address">Address (Opt)</label>
            <input className="pin-input" ref="address" />
            <input className="submit-btn" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default LightBox
