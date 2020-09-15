const winston = require("winston");
require("winston-mongodb");
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" }),
  ],
});

module.exports = function (err, req, res, next) {
  logger.error(err.stack);

  res.status(500).send("Something failed!");
};
