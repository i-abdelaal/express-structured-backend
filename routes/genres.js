const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, genre: "Art" },
  { id: 2, genre: "Science" },
];

const validate404 = (validatedItemId, res) => {
  const item = genres.find((i) => i.id === parseInt(validatedItemId));
  if (!item) return res.status(404).send(`${validatedItemId} is not found`);
  return item;
};

const validate400 = (validatedItemBody, res) => {
  const schema = Joi.object({
    genre: Joi.string().required().min(3),
  });
  const { error } = schema.validate(validatedItemBody);
  if (error) return res.status(400).send(error.details[0].message);
};

router.get("/:id", (req, res) => {
  const item = validate404(req.params.id, res);
  res.send(item.genre);
});

router.post("/", (req, res) => {
  validate400(req.body, res);
  const genre = { id: genres.length + 1, genre: req.body.genre };
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  const item = validate404(req.params.id, res);
  validate400(req.body, res);
  item.genre = req.body.genre;
  res.send(item);
});

module.exports = router;
