"use strict";

const jwt = require("jsonwebtoken");
const mid = require("../middleware");
const Users = require("../models/Users");
const Pins = require("../models/Pins");

module.exports = (router, passport) => {

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
    };

    Pins.create(newPin, (error, pin) => {
      if (error) {
        return next(error);
      }
      Pins.find({}, (error, pins) => {
        res.status(200).json({ data: pins, message: "Success, your pin has been posted" });
      });
    });
  });

  router.put("/likes", mid.loggedIn, (req, res, next) => {

    const pinId = req.body.id;
    Users.findById(req.decoded.id, (error, user) => {
      const index = user.likes.indexOf(pinId);

      if (index !== -1) {
        user.likes = user.likes.filter((value) => value.toString() !== pinId);
        user.save((error, user) => {
          if (error) {
            return next(error);
          }
          Pins.findByIdAndUpdate(pinId, { $inc: { likes: -1 } }, { new: true }, (error, pin) => {
            if (error) {
              return next(error);
            }
            res.status(200).json({ data: pin, message: "Pin unliked" });
          });
        });

      } else {
        user.likes.push(pinId);
        user.save((error, user) => {
          if (error) {
            return next(error);
          }
          Pins.findByIdAndUpdate(pinId, { $inc: { likes: 1 } }, { new: true }, (error, pin) => {
            if (error) {
              return next(error);
            }
            res.status(200).json({ data: pin, message: "Pin liked" });
          });
        });
      }
    });
  });

  router.put("/views", (req, res, next) => {

    const pinId = req.body.id;

    Pins.findByIdAndUpdate(pinId, { $inc: { views: 1 } }, { new: true }, (error, pin) => {
      if (error) {
        return next(error);
      }
      res.status(200).json({ data: pin });
    });
  });

  router.post("/register", mid.loggedOut, (req, res, next) => {

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
        email: user.email,
        username: user.username,
        password: user.password
      }
    };

    Users.create(newUser, (error, user) => {
      if (error) {
        return next(error);
      }
      res.status(200).json({ message: `Success, welcome to BucketList ${ user.local.username }` });
    });
  });

  router.get("/login", mid.loggedOut, (req, res, next) => {

    const encoded = req.headers["authorization"].split(" ")[1];
    const decoded = new Buffer(encoded, "base64").toString("utf8").split(":");

    Users.authenticate(decoded[0], decoded[1], (error, user) => {
      if (error || !user) {
        res.json({ error: "Invalid username or password" })
      } else {

        jwt.sign({ username: user.local.username, id: user._id }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "1d"}, (error, token) => {
          if (error) {
            return next(error);
          }
          res.status(200).json({ token: token, message: `Hi ${ user.local.username }, you're logged in` });
        });
      }
    });
  });

  router.get("/logout", (req, res, next) => {

    if (req.decoded) {
      req.decoded = null;
    }
    res.status(200).json({ message: "You've logged out of BucketList" });
  });

  router.get("/facebook", passport.authenticate("facebook"));

  router.get("/login/facebook/return", passport.authenticate("facebook",
  { failureRedirect: "/login" }), (req, res) => {
    jwt.sign({ username: req.user.facebook.username, id: req.user._id }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "1d"}, (error, token) => {
      if (error) {
        return next(error);
      }
      res.status(200).json({ token: token, message: `Hi ${ req.user.facebook.username }, you're logged in with Facebook` });
    });
  });

  router.post("/search/:value", (req, res, next) => {
    const search = req.params.value;

  });
}
