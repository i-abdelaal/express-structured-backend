const express = require("express");
const app = express();
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const genres = require("./routes/genres");
const home = require("./routes/home");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/genres", genres);
app.use("/", home);

// console.log(`Application Name: ${config.get("name")}`);
// console.log(`Mail Server: ${config.get("mail.host")}`);
// console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server launched on port ${port}`);
});
