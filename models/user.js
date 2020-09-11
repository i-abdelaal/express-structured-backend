const Joi = require("joi");
const mongoose = require("mongoose");
const joiObjectid = require("joi-objectid");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

const User = mongoose.model("User", userSchema);

const validateUser = (userInfo, res) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().required().email().min(5).max(255),
    password: Joi.string().required().min(5).max(255),
  });

  const { error } = schema.validate(userInfo);
  if (error) return res.status(400).send(error.details[0].message);
};

exports.User = User;
exports.validateUser = validateUser;
