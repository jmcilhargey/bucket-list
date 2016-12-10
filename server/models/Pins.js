"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PinSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  event: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
});

const Pin = mongoose.model("Pin", PinSchema);

module.exports = Pin;
