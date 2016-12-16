"use strict";

import fetch from "isomorphic-fetch";
import { browserHistory } from "react-router";

/* Home Component */

export const requestPins = () => {
  return { type: "REQUEST_PINS" };
};

export const receivePins = (json) => {
  return {
    type: "RECEIVE_PINS",
    isFetching: false,
    data: json.data,
    receivedAt: Date.now()
  }
};

export const fetchPins = () => (dispatch) => {
  dispatch(requestPins());
  return fetch("api/pins", {
    method: "GET",
    headers: {
      "Accept": "application/json"
    },
    credentials: "same-origin"
  }).then(response => response.json())
    .then(json => {
      if (json.data) {
        dispatch(receivePins(json));
      }
      if (json.error) {
        dispatch(storeError(json));
      }
    })
    .catch(error => {
      dispatch(storeError(json));
    });
};

export const incrementViews = (id) => (dispatch) => {
  return fetch("api/views", {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "same-origin",
    body: `id=${ id }`
  }).then(response => response.json())
    .then(json => {
      if (json.data) {
        dispatch(updatePin(json));
      }
      if (json.error) {
        dispatch(storeError(json));
      }
    })
    .catch(error => {
      dispatch(storeError(error));
    });
};

export const likePin = (id) => (dispatch, getState) => {
  const userData = getState().loginUser.userData;
  return fetch("api/likes", {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Access-Token": userData ? userData.token : ""
    },
    credentials: "same-origin",
    body: `id=${ id }`
  }).then(response => response.json())
    .then(json => {
      if (json.data) {
        dispatch(updatePin(json));
        dispatch(storeMessage(json));
      }
      if (json.error) {
        dispatch(storeError(json));
      }
    })
    .catch(error => {
      dispatch(storeError(error));
    });
};

export const updatePin = (json) => {
  return {
    type: "UPDATE_PIN",
    data: json.data
  }
};

export const showPinDetail = (index) => {
  return {
    type: "SHOW_PIN_DETAIL",
    selected: index
  }
};

export const hidePinDetail = () => {
  return {
    type: "HIDE_PIN_DETAIL"
  }
};

/* LightBox Component */

export const showBox = () => {
  return { type: "SHOW_BOX" };
};

export const hideBox = () => {
  return { type: "HIDE_BOX" };
};

export const previewImage = (url) => {
  return {
    type: "PREVIEW_IMAGE",
    previewUrl: url
  };
};

export const createPin = () => {
  return { type: "CREATE_PIN" }
};

export const sendPinData = (data) => (dispatch, getState) => {
  dispatch(createPin());
  const userData = getState().loginUser.userData;
  return fetch("/api/pin", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Access-Token": userData ? userData.token : ""
    },
    credentials: "same-origin",
    body: `image=${ data.image }&title=${ data.title }&event=${ data.event }&address=${ data.address }&time=${ data.time }`
  }).then(response => response.json())
    .then(json => {
      if (json.data) {
        dispatch(receivePins(json));
        dispatch(storeMessage(json));
      }
      if (json.error) {
        dispatch(storeError(json));
      }
    })
    .catch(error => {
      dispatch(storeError(error));
    });
};

/* Register Component */

export const registerUser = () => {
  return {
    type: "REGISTER_USER",
    isRegistering: true
  }
};

export const sendUserData = (data) => (dispatch) => {
  dispatch(registerUser());
  return fetch("/api/register", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "same-origin",
    body: `username=${ data.username }&email=${ data.email }&password=${ data.password }&confirm=${ data.confirm }`
  }).then(response => response.json())
    .then(json => {
      if (json.token) {
        dispatch(receiveuser(json));
      }
      if (json.error) {
        dispatch(storeError(json));
      }
      browserHistory.push("/login");
    })
    .catch(error => {
      dispatch(storeError(error));
    });
};

export const receiveUser = (json) => {
  return {
    type: "RECEIVE_USER",
    data: json
  }
};

/* Login Component */

export const loginUser = () => {
  return {
    type: "REGISTER_USER",
    isRegistering: true
  }
};

export const sendLoginData = (data) => (dispatch) => {
  dispatch(loginUser());
  return fetch("/api/login", {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": "Basic " + btoa(`${ data.username }:${ data.password }`)
    },
    credentials: "same-origin"
  }).then(response => response.json())
    .then(json => {
      if (json.token) {
        dispatch(receiveUser(json));
        dispatch(storeMessage(json));
        browserHistory.push("/");
      }
      if (json.error) {
        dispatch(storeError(json));
      }
    })
    .catch(error => {
      dispatch(storeError(error));
    });
};

export const fbLogin = () => {
  return {
    type: "FB_LOGIN",
    isRegistering: true
  }
};

export const facebookLogin = () => (dispatch) => {
  dispatch(fbLogin());
  return fetch("/api/facebook", {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    credentials: "include",
    mode: "no-cors"
  }).then(response => response.json())
    .then(json => {
      if (json.token) {
        dispatch(receiveUser(json));
        dispatch(storeMessage(json));
        browserHistory.push("/");
      }
      if (json.error) {
        dispatch(storeError(json));
      }
    })
    .catch(error => {
      dispatch(storeError(error));
    });
};

/* Logout */

export const resetUser = () => {
  return {
    type: "RESET_USER"
  }
};

export const logoutUser = () => (dispatch) => {
  return fetch("api/logout", {
    method: "GET",
    headers: {
      "Accept": "application/json"
    },
    credentials: "same-origin"
  }).then(response => response.json())
    .then(json => {
      dispatch(storeMessage(json));
      dispatch(resetUser());
    })
    .catch(error => {
      dispatch(storeError(error));
    });
};

/* Messaging */

export const storeMessage = (data) => {
  return {
    type: "STORE_MESSAGE",
    message: data.message
  }
};

export const clearMessage = () => {
  return {
    type: "CLEAR_MESSAGE"
  }
};

export const storeError = (data) => {
  return {
    type: "STORE_ERROR",
    error: data.error
  }
};

export const clearError = () => {
  return {
    type: "CLEAR_ERROR"
  }
};
