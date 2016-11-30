"use strict";

import React from "react";
import Header from "./header";
import Footer from "./footer";

class App extends React.Component {
  render() {
    return (
      <div className="main-container">
        <Header />
        <div className="main-body">
          { this.props.children }
        </div>
        <Footer />
        <div className="overlay"></div>
      </div>
    );
  }
}

export default App
