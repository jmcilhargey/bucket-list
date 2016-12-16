"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  local: {
    email: {
      type: String,
      unique: true,
      trim: true
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    password: {
      type: String
    }
  },
  facebook: {
    username: {
      type: String,
      sparse: true
    },
    token: {
      type: String,
      sparse: true,
      unique: true
    },
    id: {
      type: String,
      sparse: true,
      unique: true
    }
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: []
  }
});

UserSchema.statics.authenticate = function (username, password, callback) {

 User.findOne({ "local.username": username })
   .exec((error, user) => {
     if (error) {
       return callback(error);
     }
     if (!user) {
       let error = new Error("User not found");
       error.status = 401;
       return callback(error);
     }

     bcrypt.compare(password, user.local.password, function (error, match) {
       if (match) {
         return callback(null, user);
       } else if (error) {
         return next(error);
       } else {
         let error = new Error("Credentials don't match");
         error.status = 401;
         return callback(error);
       }
     });
   });
};

UserSchema.pre("save", function (next) {

 const user = this;
 if (!user.isModified("local.password")) {
   return next();
 }
 bcrypt.genSalt(10, function (error, salt) {
   bcrypt.hash(user.local.password, salt, function (error, hash) {
     if (error) {
       return next(error);
     }
     user.local.password = hash;
     next();
   });
 });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
