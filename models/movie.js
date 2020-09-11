const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

const validateMovie = (movie, res) => {
  const schema = Joi.object({
    title: Joi.string().required().min(0).max(50),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required().min(0),
    dailyRentalRate: Joi.number().required().min(0),
  });
  const { error } = schema.validate(movie);
  if (error) return res.status(400).send(error.details[0].message);
};

exports.Movie = Movie;
exports.validateMovie = validateMovie;
