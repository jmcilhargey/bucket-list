"use strict";

import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPins } from "../actions";

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
  render() {
    const data = this.props.pinData;
    console.log(data);
    let pins = null;
    if (data) {
      pins = data.map((pin, index) => {
        return (
          <div className="pin-card" key={ index }>
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
    return (
      <div className="home-container">
        { pins }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { pinsView } = state
  return {
    pinData: pinsView.pinData,
    isFetching: pinsView.isFetching,
    receivedAt: pinsView.receivedAt
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchPins: fetchPins
  }, dispatch);
}

const HomeView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeView;
