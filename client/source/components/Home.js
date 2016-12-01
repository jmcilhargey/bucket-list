"use strict";

import React from "react";
import like from "../images/like.svg";
import view from "../images/view.svg";

class Home extends React.Component {
  render() {
    const data = [
    {
      "user": "Joe",
      "name": "Walk the Golden Gate",
      "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/800px-GoldenGateBridge-001.jpg",
      "time": "1h",
      "views": 15,
      "likes": 3
    },
    {
      "user": "Joe",
      "name": "Walk the Golden Gate",
      "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/800px-GoldenGateBridge-001.jpg",
      "time": "1h",
      "views": 15,
      "likes": 3
    },
    {
      "user": "Joe",
      "name": "Walk the Golden Gate",
      "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/800px-GoldenGateBridge-001.jpg",
      "time": "1h",
      "views": 15,
      "likes": 3
    },
    {
      "user": "Joe",
      "name": "Walk the Golden Gate",
      "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/800px-GoldenGateBridge-001.jpg",
      "time": "1h",
      "views": 15,
      "likes": 3
    }];
    const pins = data.map((pin) => {
      return (
        <div className="pin-card">
          <p>{ pin.name }</p>
          <img src={ pin.url }/>
          <div className="pin-details">
            <p>{ pin.user }</p>
            <p>{ pin.time }</p>
            <p><span dangerouslySetInnerHTML={{ __html: view }}></span>{ pin.views }</p>
            <p><span dangerouslySetInnerHTML={{ __html: like }}></span>{ pin.likes }</p>
          </div>
        </div>
      );
    });
    return (
      <div className="home-container">
        { pins }
      </div>
    )
  }
}

export default Home
