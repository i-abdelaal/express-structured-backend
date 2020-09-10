const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const mongoose = require("mongoose");

const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");

mongoose
  .connect("mongodb://localhost/genres", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB/genres..."))
  .catch((err) => console.error("Could not connect to genres ", err));
mongoose
  .connect("mongodb://localhost/customers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB/customers..."))
  .catch((err) => console.error("Could not connect to customers", err));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/", home);
app.use("/genres", genres);
app.use("/customers", customers);

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
