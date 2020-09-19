const express = require("express");

const { Genre, validateGenre } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send(`${req.body.name} is not found`);
  res.send(genre);
});

router.post("/", [auth, validate(validateGenre)], async (req, res) => {
  let genre = new Genre({
    name: req.body.name,
  });
  try {
    genre = await genre.save();
    res.send(genre);
  } catch (ex) {
    for (const field in ex.errors) {
      res.status(400).send(ex.errors[field].message);
    }
  }
});

router.put(
  "/:id",
  [auth, validate(validateGenre), validateObjectId],
  async (req, res) => {
    try {
      const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
      );
      if (!genre) return res.status(404).send(`${req.body.name} is not found`);
      res.send(genre);
    } catch (ex) {
      for (const field in ex.errors) {
        res.status(400).send(ex.errors[field].message);
      }
    }
  }
);

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send(`${req.body.name} is not found`);
  res.send(genre);
});

module.exports = router;
