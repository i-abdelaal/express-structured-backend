const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const router = express.Router();

const { User, validateUser } = require("../models/user");

router.post("/", async (req, res) => {
  validateUser(req.body, res);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists!");
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
