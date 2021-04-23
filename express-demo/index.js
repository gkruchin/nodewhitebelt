const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' }
]

app.get('/', (req, res) => {
  res.send('Hello WorldZ');
});
 
app.get('/api/courses', (req, res) => {
  res.send(courses);
})

app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  };

  const result = Joi.validate(req.body, schema);
  console.log(result);
  // if (!req.body.name || req.body.name.length < 3)
  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course);
})

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) { // 404 reseponse
    res.status(404).send('The course with the given ID was not found')
  }
  res.send(course);
})

// PORT
const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening on port > ${port}`));
