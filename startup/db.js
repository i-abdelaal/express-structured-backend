const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/vidly", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      winston.add(new winston.transports.File({ filename: "db.log" }));
      winston.info("Connected to MongoDB...");
    });
};
