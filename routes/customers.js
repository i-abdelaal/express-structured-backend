const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const router = express.Router();

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },

  phone: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 13,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

const validate400 = (validatedItemBody, res) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    phone: Joi.Number().required().min(5).max(13),
    isGold: Joi.Boolean(),
  });
  const { error } = schema.validate(validatedItemBody);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  validate400(req.body, res);
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  try {
    customer = await customer.save();
    res.send(customer);
    // await course.validate();
  } catch (ex) {
    for (const field in ex.errors) {
      res.status(400).send(ex.errors[field].message);
    }
  }
});
module.exports = router;
