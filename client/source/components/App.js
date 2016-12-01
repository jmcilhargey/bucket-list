"use strict";

import React from "react";
import Header from "./header";
import Footer from "./footer";

import close from "../images/close.svg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "", addNew: false };
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onToggleAdd = this.onToggleAdd.bind(this);
  }
  onToggleAdd() {
    const addBool = !this.state.addNew;
    this.setState({ addNew: addBool });
  }
  onChangeUrl(event) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    const input = event.target.value;
    if (input.match(regex)) {
      this.setState({ url: event.target.value });
    }
  }
  render() {
    const addNew = this.state.addNew
    return (
      <div className="main-container">
        <Header onToggleAdd={ this.onToggleAdd } />
        <div className="main-body">
          { this.props.children }
        </div>
        <Footer />
        { addNew &&
        <div>
          <div className="overlay"></div>
          <div className="light-box">
            <div className="close-box" onClick={ this.onToggleAdd } dangerouslySetInnerHTML={{ __html: close }}></div>
            <div className="img-preview">
              <p>Image Preview</p>
              <img src={ this.state.url } />
            </div>
            <form className="pin-form">
              <label htmlFor="url">Image Url</label>
              <input className="pin-input" onChange={ this.onChangeUrl } type="text" ref="url" />
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

export default App
