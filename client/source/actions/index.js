"use strict";

export function increment() {
  return { type: "INCREMENT" };
}

export function newPost() {
  return { type: "NEW_POST" };
}

export function previewImage(url) {
  return { type: "PREVIEW_IMAGE", url: url };
}
