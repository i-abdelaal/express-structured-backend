const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const { User } = require("../models/user");

const router = express.Router();

const validate = (user, res) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(user);
  if (error) return res.status(400).send(error.details[0].message);
};

router.post("/", async (req, res) => {
  validate(req.body, res);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Credentials!");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Credentials!");
  res.send("TRUE");
});

module.exports = router;
