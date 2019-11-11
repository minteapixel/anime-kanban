const express = require("express");
const router = express.Router();
const formatDate = require('../utils/formatDate');
const request = require('request');

router.get("/", function(req, res) {
  let query = req.query.search;
  let url = "https://api.jikan.moe/v3/search/anime?q=" + query + "&limit=16";

  request(url, (err, response, body) => {
      if (!err && response.statusCode == 200) {
          console.log("request went through successfully");
          const data = JSON.parse(body);
          // res.send(parsedData);
          res.render("results", { data: data, query : req.query.search, formatDate });
      } else {
          console.log("error: request didn't go through.");
          res.send('Sorry there was an error. Please go back to the previous page.');
      }
  });
});

module.exports = router;