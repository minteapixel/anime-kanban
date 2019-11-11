const express = require("express");
const router = express.Router();

router.get("/", (req, res) => (
  res.send("Homepage")
));

// router.get("/", (req, res) => (
//   res.send("404 - can't find that page")
// ));

module.exports = router;