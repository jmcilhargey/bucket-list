"use strict";

const express = require("express");
const router = express.Router();

router.get("/test", (req, res, next) => {
  res.status(200).send({ message: "Working routes!" });
});

router.post("/register", (req, res, next) => {
  res.send({ body: req.body });
});

router.post("/login", (req, res, next) => {
  res.send({ body: req.body });
});

router.get("/logout", (req, res, next) => {

});

router.get("/facebook", (req, res, next) => {

});

router.post("/new", (req, res, next) => {

});

router.post("/search", (req, res, next) => {

});

module.exports = router;
