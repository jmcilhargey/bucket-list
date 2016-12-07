"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PinSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  url: {
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
