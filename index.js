const express = require("express");
const app = express();
const request = require('request');
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// seeds
const cards = [
        { name: "Kimetsu no Yaiba", imageUrl: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg?s=e497d08bef31ae412e314b90a54acfda", type: "TV", episodes: "26" },
        { name: "Fruits Basket", imageUrl: "https://cdn.myanimelist.net/images/anime/1447/99827.jpg?s=e7fe0a2c22c4868dc7b3bde0d61085f9", type: "TV", episodes: "23" },
        { name: "Violette Evergarden", imageUrl: "https://cdn.myanimelist.net/images/anime/1795/95088.jpg?s=9e24a139603a4e0ea8ea055a230b54d5", type: "TV", episodes: "12" }
    ];

app.get("/", (req, res) => (
    res.send("Homepage")
));

app.get("/dashboard", function(req, res){
    res.render("dashboard", { cards });
});

app.post("/dashboard", (req, res) => {
    // var name = "absdsf";
    // var imageUrl = "asdfsadf";
    // var type = "asdf";
    // var episodes = "adfasdf";
    // var newCard = { name, imageUrl, type, episodes }
    // cards.push(newCard);
    res.send("Posted onto a list on the dashboard page!");
});

app.get("/search", (req, res) => (
    res.render("search")
));

app.get("/results", function(req, res) {
    var query = req.query.search;
    var url = "https://api.jikan.moe/v3/search/anime?q=" + query + "&limit=16";

    request(url, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            console.log("request went through successfully");
            const data = JSON.parse(body);
            // res.send(parsedData);
            res.render("results", { data: data, query : req.query.search });
        } else {
            console.log("error: request didn't go through.");
            res.send('Sorry there was an error. Please go back to the previous page.');
        }
    });
});

app.listen(port, () => {
    console.log("AnimeKanban App has started.");
});
