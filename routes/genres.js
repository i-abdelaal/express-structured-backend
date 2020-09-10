const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const router = express.Router();

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

// const validate404 = (validatedItemId, res) => {
//   const item = genres.find((i) => i.id === parseInt(validatedItemId));
//   if (!item) return res.status(404).send(`${validatedItemId} is not found`);
//   return item;
// };

const validate400 = (validatedItemBody, res) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
  });
  const { error } = schema.validate(validatedItemBody);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = Genre.findById(req.params.id);
  if (!genre) return res.status(404).send(`${req.body.name} is not found`);
  res.send(genre);
});

router.post("/", async (req, res) => {
  validate400(req.body, res);
  let genre = new Genre({
    name: req.body.name,
  });
  try {
    genre = await genre.save();
    res.send(genre);
    // await course.validate();
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
