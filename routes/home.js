const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "My Express App",
    m1: "Express on Heroku",
    m2:
      "Welcome to my Express app on Heroku which is connected to Atlas MongoDB.",
  });
});

module.exports = router;
