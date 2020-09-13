const express = require("express");

const { Genre, validate400 } = require("../models/genre");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = Genre.findById(req.params.id);
  if (!genre) return res.status(404).send(`${req.body.name} is not found`);
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  validate400(req.body, res);
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

router.put("/:id", async (req, res) => {
  validate400(req.body, res);
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
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send(`${req.body.name} is not found`);
  res.send(genre);
});

module.exports = router;
