"use strict";

const passport = require("passport");
const Strategy = require("passport-facebook").Strategy;
const User = require("../models/user");

passport.new(new Strategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: process.env.CB_URL || "http://localhost:3000/login/facebook/return"
}), (accessToken, refreshToken, profile, cb) => {

  User.findOne({ facebook.id: profile.id }, (err, user) => {
    if (err) {
      return cb(err);
    }
    if (!user) {
      let user = new User({
        email: profile.emails[0].value,
        name: profile.displayName,
        facebook.username: profile.username,
        facebook.token: token,
        facebook.id: profile.id
      });
      user.save((err, user) => {
        if (err) {
          return cb(err);
        }
        return cb(null, user);
      });
    }
  });
});

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
