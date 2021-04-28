const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get("env")}`); // if above NODE_ENV is not configured, defaults to development

app.set("view engine", "pug");
app.set("views", "./views"); // default is ./views

app.use(express.json()); // express.json() middleware function -> // parses request body in to a json object
//app.use(express.urlencoded()); // req.body - older traditional express middleware function for html forms req bodies, key=value&key-value
app.use(express.urlencoded({ extended: true })); // for parsing more complicated stuff like arrays/nested obj's, etc
app.use(express.static("public")); // for serving styling files, css, etc
app.use(helmet()); // helmet - helps secure HTTP method
app.use("/api/courses", courses); // for any route starts with api/courses, use the courses router object from imported^^
app.use("/", home);

//Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  // console.log(
  //   "Morgan is enabled... because of development environment configured on"
  // );
  startupDebugger("Morgan enabled...");
}
// morgan - helps with logging

// Db work...
dbDebugger("Connected to the database...");

app.use(logger);

// app.use(function (req, res, next) {
//   console.log("Logging..."); // imagine this middleware function is for logging every request
//   next(); // call next to pass control to the next middlware function in the pipeline
//   // if you don't do this, because ur not terminating the request response cycle, we'll be lefting hanging
// });

app.use(function (req, res, next) {
  console.log("Authenticating..."); // imagine this middleware function is for logging every request
  next(); // call next to pass control to the next middlware function in the pipeline
  // if you don't do this, because ur not terminating the request response cycle, we'll be lefting hanging
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port > ${port}`));
