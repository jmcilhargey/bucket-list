"use strict";

import fetch from "isomorphic-fetch";

export const showBox = () => {
  return { type: "SHOW_BOX" };
}

export const hideBox = () => {
  return { type: "HIDE_BOX" };
}

export const previewImage = (url) => {
  return { type: "PREVIEW_IMAGE", previewUrl: url };
}

export const showPinDetail = (id) => {
  return { type: "SHOW_PIN_DETAIL", pinId: id };
}

export const requestPins = () => {
  return { type: "REQUEST_PINS", isFetching: true };
}

export const receivePins = (json) => {
  return {
    type: "RECEIVE_PINS",
    isFetching: false,
    data: json.data,
    receivedAt: Date.now()
  }
}

export const registerUser = () => {

}

export const loginUser = () => {

}

export const shouldFetchPins = () => (dispatch, getState) => {
  console.log("hello");
}

export const fetchPins = () => (dispatch) => {

  dispatch(requestPins());

  return fetch("/api/pins", {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "same-origin"
  }).then(response => response.json())
    .then(json => {
      console.log(json);
    })
    .catch(error => {
      console.log(error);
    });
}
