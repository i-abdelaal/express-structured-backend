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

const validateGenre = (validatedItemBody) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
  });
  return schema.validate(validatedItemBody);
};

exports.Genre = Genre;
exports.validateGenre = validateGenre;
exports.genreSchema = genreSchema;
