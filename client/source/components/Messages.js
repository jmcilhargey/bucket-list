"use strict";

import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import close from "../images/close.svg";

class Messages extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const message = this.props.message;
    const error = this.props.error;
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="message"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 }>
          { message &&
          <div onClick={ this.props.onClick } className="success-message">
            <span className="close-message-box" dangerouslySetInnerHTML={{ __html: close }}></span>
            <p>{ message }</p>
          </div> }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="error"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 }>
          { error &&
          <div onClick={ this.props.onClick } className="error-message">
            <div className="close-error-box" dangerouslySetInnerHTML={{ __html: close }}></div>
            <p>{ error }</p>
          </div> }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Messages.propTypes = {
  onClick: React.PropTypes.func
};

export default Messages
