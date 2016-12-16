"use strict";

import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import LightBox from "../components/lightbox";
import Messages from "../components/messages";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showBox, hideBox, previewImage, sendPinData, logoutUser, clearMessage, clearError } from "../actions";

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
  handleClearMessage() {
    this.props.clearMessage();
  }
  render() {
    const isBox = this.props.isBox;
    return (
      <div className="main-container">
        <Header
          onShowBox={ () => this.props.showBox() }
          isLogin= { this.props.isLogin }
          onLogout={ this.handleLogout.bind(this) } />
        <Messages
          onClick={ this.handleClearMessage.bind(this) }
          message={ this.props.validMessage }
          error={ this.props.errorMessage } />
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
  const { newPinBox, loginUser, messageInfo } = state
  return {
    isBox: newPinBox.isBox,
    previewUrl: newPinBox.previewUrl,
    userData: loginUser.userData,
    isLogin: loginUser.isLogin,
    validMessage: messageInfo.validMessage,
    errorMessage: messageInfo.errorMessage
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showBox: showBox,
    hideBox: hideBox,
    previewImage: previewImage,
    sendPinData: sendPinData,
    logoutUser: logoutUser,
    clearMessage: clearMessage,
    clearError: clearError
  }, dispatch);
}

const MainApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default MainApp;
