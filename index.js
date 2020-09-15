require("express-async-errors");
require("winston-mongodb");
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const mongoose = require("mongoose");
const winston = require("winston");

winston.exceptions.handle(
  new winston.transports.File({ filename: "exceptions.log" }),
  new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
);

process.on("unhandledRejection", (ex) => {
  throw ex;
});

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined!");
  process.exit(1);
}

const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");
const { exceptions } = require("winston");

mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect ", err));

app.set("view engine", "pug");
app.set("views", "./views");

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

// if (app.get("env") === "development") {
//   app.use(morgan("tiny"));
//   startupDebugger("Morgan enabled...");
// }

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server launched on port ${port}`);
});
