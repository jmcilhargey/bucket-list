"use strict";

export function bucketApp(state = { counter: 0, add: false, url: "" }, action) {

  switch (action.type) {
    case "INCREMENT":
      return Object.assign({}, state, { counter: state.counter + 1 });
      break;
    case "NEW_POST":
      return Object.assign({}, state, { add: !state.add });
      break;
    case "PREVIEW_IMAGE":
      return Object.assign({}, state, { url: action.url });
      break;
    default:
      return state;
  }
}
