"use strict";

import * as React from "react";
import close from "../images/close.svg";
import like from "../images/like.svg";

class PinDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const pinData = this.props.pinData;
    return (
      <div>
        <div className="overlay"></div>
        <div className="pin-detail-box">
          <div className="close-box" onClick={ this.props.onClickHide } dangerouslySetInnerHTML={{ __html: close }}></div>
          <img className="pin-detail-image" src={ pin.image } />
          <h3>{ pin.title } </h3>
          <p><b>Posted by</b>: { pin.user } </p>
          <p><b>Located at:</b> { pin.address } </p>
          <p><b>Likes:</b> { pin.likes } </p>
          <p><b>Views:</b> { pin.views } </p>
          <span onClick={ this.props.onClickLike } className="pin-detail-like" dangerouslySetInnerHTML={{ __html: like }}></span>
        </div>
      </div>
    );
  }
}

PinDetail.propTypes = {
  pinData: React.PropTypes.element.object,
  onClickHide: React.PropTypes.element.func,
  onClickLike: React.PropTypes.element.func
};

export default PinDetail
