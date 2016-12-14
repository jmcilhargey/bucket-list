"use strict";

import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

const newPinBox = (state = {
    counter: 0,
    isBox: false,
    previewUrl: "",
    isCreating: false
  }, action) => {

  switch(action.type) {
    case "SHOW_BOX":
      return Object.assign({}, state, { isBox: true });
      break;
    case "HIDE_BOX":
      return Object.assign({}, state, { isBox: false });
      break;
    case "PREVIEW_IMAGE":
      return Object.assign({}, state, { previewUrl: action.previewUrl });
      break;
    case "CREATE_PIN":
      return Object.assign({}, state, { isCreating: true, isBox: false });
      break;
    default:
      return state;
  }
}

const pinsView = (state = {
  isFetching: false,
  pinData: null,
  receivedAt: null
}, action) => {

  switch(action.type) {
    case "REQUEST_PINS":
      return Object.assign({}, state, { isFetching: true });
      break;
    case "RECEIVE_PINS":
      return Object.assign({}, state, { isFetching: false, pinData: action.data, receivedAt: action.receivedAt });
      break;
    default:
      return state;
  }
}

const registerUser = (state = {
  isRegistering: false
}, action) => {
  switch(action.type) {
    case "REGISTER_USER":
      return Object.assign({}, state, { isRegistering: true });
      break;
    case "FB_LOGIN":
      return Object.assign({}, state, { isRegistering: true });
      break;
    default:
      return state;
  }
}

const loginUser = (state = {
  loggingIn: false,
  isLogin: false,
  userData: null
}, action) => {
  switch(action.type) {
    case "LOGIN_USER":
      return Object.assign({}, state, { loggingIn: true });
      break;
    case "RECEIVE_USER":
      return Object.assign({}, state, { loggingIn: false, isLogin: true, userData: action.data });
      break;
    case "RESET_USER":
      return Object.assign({}, state, { isLogin: false, userData: null });
      break;
    default:
      return state;
  }
}

const messageInfo = (state = {
  validMessage: null,
  errorMessage: null,
  showMessage: false
}, action) => {

  switch(action.type) {
    case "STORE_MESSAGE":
      return Object.assign({}, state, { validMessage: action.message });
      break;
    case "STORE_ERROR":
      return Object.assign({}, state, { errorMessage: action.error });
      break;
    case "CLEAR_MESSAGE":
      return Object.assign({}, state, { validMessage: null });
      break;
    case "CLEAR_ERROR":
      return Object.assign({}, state, { errorMessage: null });
      break;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  newPinBox,
  pinsView,
  registerUser,
  loginUser,
  messageInfo,
  form: reduxFormReducer
});

export default rootReducer;
