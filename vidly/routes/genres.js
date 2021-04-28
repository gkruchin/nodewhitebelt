const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "Animated" },
  { id: 4, name: "Comedy" },
  { id: 5, name: "Crime & Mystery" },
  { id: 6, name: "Fantasy" },
  { id: 7, name: "Historical" },
  { id: 8, name: "Horror" },
  { id: 9, name: "Romance" },
  { id: 10, name: "Science Fiction" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send(`Genre with id ${req.params.id} not found`);
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send(`Genre with id ${req.params.id} not found`);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genres);
});

router.put("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send(`Genre with id ${req.params.id} not found`);

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
