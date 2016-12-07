"use strict";

import React from "react";
import Header from "./header";
import Footer from "./footer";
import LightBox from "./lightbox";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { increment, newPost, previewImage } from "../actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeUrl = this.onChangeUrl.bind(this);
  }
  onChangeUrl(event) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    const input = event.target.value;
    if (input.match(regex)) {
      this.props.previewImage(input);
    }
  }
  render() {
    return (
      <div className="main-container">
        <Header onToggleAdd={ () => this.props.newPost() } />
        <div className="main-body">
          { this.props.children }
        </div>
        <Footer />
        { this.props.add && <LightBox
          onChangeUrl={ (event) => this.onChangeUrl(event) }
          onNewPost={ () => this.props.newPost() }
          url={ this.props.url } />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
    add: state.add,
    url: state.url
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    increment: increment,
    newPost: newPost,
    previewImage: previewImage
  }, dispatch);
}

const MainApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default MainApp;
