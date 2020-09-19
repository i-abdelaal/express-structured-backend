const express = require("express");

const { Customer, validateCustomer } = require("../models/customer");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", [auth, validate(validateCustomer)], async (req, res) => {
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  try {
    customer = await customer.save();
    res.send(customer);
  } catch (ex) {
    for (const field in ex.errors) {
      res.status(400).send(ex.errors[field].message);
    }
  }
});
module.exports = router;
