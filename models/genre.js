const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

const validate400 = (validatedItemBody, res) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
  });
  const { error } = schema.validate(validatedItemBody);
  if (error) return res.status(400).send(error.details[0].message);
};

exports.Genre = Genre;
exports.validate400 = validate400;
exports.genreSchema = genreSchema;
