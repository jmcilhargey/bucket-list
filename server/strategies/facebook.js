"use strict";

const Strategy = require("passport-facebook").Strategy;
const User = require("../models/Users");

module.exports = (passport) => {

  passport.use(new Strategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: process.env.CB_URL || "http://localhost:3000/api/login/facebook/return",
    profileFields: ["id", "displayName", "email"],
    scope: ["public_profile", "email"]
  }, (accessToken, refreshToken, profile, cb) => {

    User.findOne({ "facebook.id": profile.id }, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        let user = new User({
          facebook: {
            id: profile.id,
            token: accessToken,
            email: profile.emails[0].value || "",
            username: profile.displayName || ""
          }
        });
        user.save((err, user) => {
          if (err) {
            return cb(err);
          }
          return cb(null, user);
        });
      } else {
        return cb(null, user);
      }
    });
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
};
