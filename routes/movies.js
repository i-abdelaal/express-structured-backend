const express = require("express");

const { Movie, validateMovie } = require("../models/movie");
const { Genre } = require("../models/genre");

const router = express.Router();

router.post("/", async (req, res) => {
  validateMovie(req.body, res);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Invalid genre!");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  try {
    movie = await movie.save();
    res.send(movie);
  } catch (ex) {
    for (const field in ex.errors) {
      res.status(400).send(ex.errors[field].message);
    }
  }
});

module.exports = router;
