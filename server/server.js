"use strict";

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");

const uri = process.env.MONGO_URI || "mongodb://localhost/test";
const port = process.env.PORT || 3000;
const routes = require("./routes");

require("./seed")();

mongoose.Promise = global.Promise;
mongoose.connect(uri, (err, res) => {
  if (err) {
    console.error(err);
  }
  console.log("MongoDB connected to " + uri);
});

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname + "/../client/source/images/favicon.ico")));
app.use(express.static(path.join(__dirname + "/../client/build")));

app.use("/api", routes);

app.get("/*", (req, res, next) => {
  res.status(301).redirect("/");
});

app.use((req, res, next) => {
  let error = new Error("Page not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.send({ error: err.status, message: err.message });
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Server listening on port " + port);
  }
});
