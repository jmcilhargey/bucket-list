"use strict";

import React from "react";
import Header from "./header";
import Footer from "./footer";
import LightBox from "./lightbox";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showBox, hideBox, previewImage, sendPinData, logoutUser } from "../actions";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit(values) {
    this.props.sendPinData(values);
  }
  onChangeUrl(event) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    const input = event.target.value;
    if (input.match(regex)) {
      this.props.previewImage(input);
    }
  }
  handleLogout() {
    this.props.logoutUser();
  }
  render() {
    const isBox = this.props.isBox;
    return (
      <div className="main-container">
        <Header
          onShowBox={ () => this.props.showBox() }
          isLogin= { this.props.isLogin }
          onLogout={ this.handleLogout.bind(this) } />
        <div className="main-body">
          { this.props.children }
        </div>
        <Footer />
        { isBox && <LightBox
          onChangeUrl={ (event) => this.onChangeUrl(event) }
          onHideBox={ () => this.props.hideBox() }
          previewUrl={ this.props.previewUrl }
          onSubmit={ this.handleSubmit.bind(this) } />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { newPinBox, loginUser } = state
  return {
    isBox: newPinBox.isBox,
    previewUrl: newPinBox.previewUrl,
    userData: loginUser.userData,
    isLogin: loginUser.isLogin
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showBox: showBox,
    hideBox: hideBox,
    previewImage: previewImage,
    sendPinData: sendPinData,
    logoutUser: logoutUser
  }, dispatch);
}

const MainApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default MainApp;
