const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },

  phone: {
    type: String,
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

const validateCustomer = (validatedItemBody, res) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    phone: Joi.string().required().min(5).max(13),
    isGold: Joi.boolean(),
  });
  return schema.validate(validatedItemBody);
};

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
exports.customerSchema = customerSchema;
