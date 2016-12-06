"use strict";

import React from "react";
import Header from "./header";
import Footer from "./footer";

import close from "../images/close.svg";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { increment, newPost, previewImage } from "../actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onPreviewImage = this.onPreviewImage.bind(this);
  }
  onPreviewImage(event) {
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
        { this.props.add &&
        <div>
          <div className="overlay"></div>
          <div className="light-box">
            <div className="close-box" onClick={ () => this.props.newPost() } dangerouslySetInnerHTML={{ __html: close }}></div>
            <div className="img-preview">
              <p>Image Preview</p>
              <img src={ this.props.url } />
            </div>
            <form className="pin-form">
              <label htmlFor="url">Image Url</label>
              <input className="pin-input" onChange={ this.onPreviewImage } type="text" ref="url" />
              <label htmlFor="title">Title</label>
              <input className="pin-input" ref="title" />
              <label htmlFor="event">Event Url (Opt)</label>
              <input className="pin-input" ref="event" />
              <label htmlFor="address">Address (Opt)</label>
              <input className="pin-input" ref="address" />
              <input className="submit-btn" type="submit" value="Submit" />
            </form>
          </div>
        </div> }
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
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
  mapStatetoProps,
  mapDispatchToProps
)(App);

export default MainApp;
