const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body); // equivalent to getting result.error , but a different notation / destructuring
  // If invalid, return 400 - bad request error
  if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  // look up course
  // If it doesn't exist, return a 404 - resource not found error
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res
      .status(404)
      .send(
        `The course with given id > ${req.params.id} has not been found. Sorry, dude`
      );
    // return; or put return here instead
  }

  // Otherwise, validate course to ensure it is the kind of data you expect
  const { error } = validateCourse(req.body); // equivalent to getting result.error , but a different notation / destructuring

  // If invalid, return 400 - bad request error
  if (error) return res.status(400).send(error.details[0].message);

  // Update course
  course.name = req.body.name;
  res.send(course);
  // Return the updated course using res.send
});

router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    // 404 reseponse
    res
      .status(404)
      .send(
        `The course with given id > ${req.params.id} has not been found. Sorry, dude`
      );
    return;
  }
  //get index then splice courses array
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  //return response to the client
  res.send(course);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    // 404 reseponse
    return res
      .status(404)
      .send(
        `The course with given id > ${req.params.id} has not been found. Sorry, dude`
      );
  }
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

module.exports = router;
