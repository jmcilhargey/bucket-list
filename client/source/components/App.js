"use strict";

import React from "react";
import Header from "./header";
import Footer from "./footer";
import LightBox from "./lightbox";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showBox, hideBox, previewImage, shouldFetchPins, fetchPins } from "../actions";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (shouldFetchPins()) {
      console.log("hi");
    }
  }
  onChangeUrl(event) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    const input = event.target.value;
    if (input.match(regex)) {
      this.props.previewImage(input);
    }
  }
  render() {
    const isBox = this.props.isBox;
    return (
      <div className="main-container">
        <Header onShowBox={ () => this.props.showBox() } />
        <div className="main-body">
          { this.props.children }
        </div>
        <Footer />
        { isBox && <LightBox
          onChangeUrl={ (event) => this.onChangeUrl(event).bind(this) }
          onHideBox={ () => this.props.hideBox() }
          url={ this.props.previewUrl } />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { newPinBox, pinsView } = state
  return {
    isBox: newPinBox.isBox,
    previewUrl: newPinBox.previewUrl
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showBox: showBox,
    hideBox: hideBox,
    previewImage: previewImage,
    shouldFetchPins: shouldFetchPins,
    fetchPins: fetchPins
  }, dispatch);
}

const MainApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default MainApp;
