const express = require("express");
const router = express.Router();
const cards = require("../seeds");
const formatDate = require('../utils/formatDate');

// SHOW all cards
router.get("/", function(req, res){
  res.render("dashboard", { cards, formatDate });
});

// SHOW just ONE card (in a modal)
// router.get("/card/:id/edit")
// Card.findById.(req.params.id).populate().exec((err, foundCard)) { blah blah });

// CREATE new card and add to database
router.post("/", (req, res, err) => {
  let { title, imageUrl, type, episodes, startDate, endDate, list, malId } = req.body;
  let newCard = { title, imageUrl, type, episodes, startDate, endDate, list, malId };
  if (list == '') {
      return res.status(422).send('Oops! Please select a list.');
  } else {
      cards.push(newCard);
      return res.redirect("/dashboard");
  };
});

// EDIT card (add/edit notes OR move to a different list)
// router.put("card/:id", (err, req, res) => {})

// DESTROY card
// router.delete("card/:id", (err, req, res)  => {})

module.exports = router;

