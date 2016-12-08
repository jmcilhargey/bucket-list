"use strict";

import { combineReducers } from "redux";

const newPinBox = (state = {
    isBox: false,
    previewUrl: ""
  }, action) => {

  switch(action.type) {
    case "SHOW_BOX":
      return Object.assign({}, state, { isBox: true });
      break;
    case "HIDE_BOX":
      return Object.assign({}, state, { isBox: false });
      break;
    case "PREVIEW_IMAGE":
      return Object.assign({}, state, { url: action.url });
      break;
    default:
      return state;
  }
}

const pinsView = (state = {
  isFetching: false,
  data: null,
  receivedAt: null
}, action) => {

  switch(action.type) {
    case "REQUEST_PINS":
      return Object.assign({}, state, { isFetching: true });
      break;
    case "RECEIVE_PINS":
      return Object.assign({}, state, { isFetching: false, data: action.data, receivedAt: action.receivedAt });
      break;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  newPinBox,
  pinsView
});

export default rootReducer;
