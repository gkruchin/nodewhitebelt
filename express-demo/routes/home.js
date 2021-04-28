const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "My Express App", message: "Wadup my Pugs" });
  //  res.send("Hello WorldZ");
});

module.exports = router;
