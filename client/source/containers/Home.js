"use strict";

import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPins, showPinDetail, hidePinDetail, likePin, incrementViews } from "../actions";
import PinDetail from "../components/pindetail";

import like from "../images/like.svg";
import view from "../images/view.svg";
import time from "../images/time.svg";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.pinData) {
      this.props.fetchPins();
    }
  }
  showPinDetail(index) {
    const pinId = this.props.pinData[index]._id;
    this.props.showPinDetail(index);
    this.props.incrementViews(pinId);
  }
  hidePinDetail() {
    this.props.hidePinDetail();
  }
  likePin(id) {
    this.props.likePin(id);
  }
  render() {
    const data = this.props.pinData;
    let pins = null;
    if (data) {
      pins = data.map((pin, index) => {
        return (
          <div className="pin-card" onClick={ this.showPinDetail.bind(this, index) }key={ index }>
            <p>{ pin.title }</p>
            <img src={ pin.image }/>
            <div className="pin-details">
              <p>{ pin.user }</p>
              <p><span dangerouslySetInnerHTML={{ __html: time }}></span>{ pin.time }</p>
              <p><span dangerouslySetInnerHTML={{ __html: view }}></span>{ pin.views }</p>
              <p><span dangerouslySetInnerHTML={{ __html: like }}></span>{ pin.likes }</p>
            </div>
          </div>
        );
      });
    }
    const isDetail = this.props.isDetail;
    return (
      <div className="home-container">
        { pins }
        { isDetail && <PinDetail
          onClickHide={ this.hidePinDetail.bind(this) }
          onClickLike={ this.likePin.bind(this, this.props.pinData[this.props.selected]._id) }
          pinData={ this.props.pinData[this.props.selected] } />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { pinsView, pinDetailBox } = state
  return {
    pinData: pinsView.pinData,
    isFetching: pinsView.isFetching,
    receivedAt: pinsView.receivedAt,
    isDetail: pinDetailBox.isDetail,
    selected: pinDetailBox.selected
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchPins: fetchPins,
    showPinDetail: showPinDetail,
    hidePinDetail: hidePinDetail,
    likePin: likePin,
    incrementViews: incrementViews
  }, dispatch);
}

const HomeView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeView;
