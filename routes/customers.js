const express = require("express");
const mongoose = require("mongoose");

const { Customer, validate400 } = require("../models/customer");

const router = express.Router();

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
  } catch (ex) {
    for (const field in ex.errors) {
      res.status(400).send(ex.errors[field].message);
    }
  }
});
module.exports = router;
