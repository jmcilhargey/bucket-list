"use strict";

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mid = require("../middleware");

const Users = require("../models/users");
const Pins = require("../models/pins");

require("../../env");

router.get("/pins", (req, res, next) => {

  Pins.find({}, (error, pins) => {
    if (error) {
      return next(error);
    }
    res.status(200).json({ data: pins });
  });
});

router.post("/pin", mid.loggedIn, (req, res, next) => {

  const pin = req.body;
  if (!pin.image || !pin.title) {
    let error = new Error("Image URL and title required");
    error.status = 400;
    return next(error);
  }
  let newPin = {
    "user": req.decoded.username,
    "image": pin.image,
    "title": pin.title,
    "address": pin.address,
    "event": pin.event
  }
  Pins.create(newPin, (error, pin) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    res.status(200).json({ pin: pin, message: ["Success, your pin has been posted!"] });
  });
});

router.post("/register", (req, res, next) => {

  const user = req.body;
  if (!user.username || !user.email || !user.password) {
    let error = new Error("Username, email, and password required");
    error.status = 400;
    return next(error);
  }
  if (user.password !== user.confirm) {
    let error = new Error("Passwords must match");
    error.status = 400;
    return next(error);
  }

  let newUser = {
    local: {
      username: user.username,
      password: user.password
    },
    email: user.email
  };

  Users.create(newUser, (error, user) => {
    if (error) {
      return next(error);
    }
    res.status(200).json({ user: user, message: ["Success, welcome to BucketList!"] });
  });
});

router.get("/login", (req, res, next) => {

  const encoded = req.headers["authorization"].split(" ")[1];
  const decoded = new Buffer(encoded, "base64").toString("utf8").split(":");

  Users.authenticate(decoded[0], decoded[1], (error, user) => {
    if (error || !user) {
      res.json({ error: ["Invalid username or password"] })
    } else {
      jwt.sign({ username: user.local.username, id: user._id }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "1d"}, (error, token) => {
        if (error) {
          return next(error);
        }
        res.status(200).json({ token: token, authenticated: true });
      });
    }
  });
});

router.get("/logout", (req, res, next) => {

});

router.get("/facebook", (req, res, next) => {

});

router.post("/search", (req, res, next) => {

});

module.exports = router;
