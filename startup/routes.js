const express = require("express");
const helmet = require("helmet");

const home = require("../routes/home");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.set("view engine", "pug");
  app.set("index", "../views");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());
  app.use("/", home);
  app.use("/genres", genres);
  app.use("/customers", customers);
  app.use("/movies", movies);
  app.use("/rentals", rentals);
  app.use("/users", users);
  app.use("/auth", auth);
  app.use(error);
};
