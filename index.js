const express = require("express");
const app = express();
const path = require('path');
const request = require('request');
const bodyParser = require("body-parser");
const formatDate = require('./utils/formatDate');
const sassMiddleware = require('node-sass-middleware');

// const mongoose = require("mongoose");

const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// loading Sass
app.use(sassMiddleware({
    src: path.join(__dirname,'sass'),
    dest: path.join(__dirname, 'public/stylesheets'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/stylesheets'
}));

app.use(express.static(path.join(__dirname, "public")));

// seeds
const cards = [
    { title: "Kimetsu no Yaiba", imageUrl: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg?s=e497d08bef31ae412e314b90a54acfda", type: "TV", episodes: "26", startDate:"2019-11-05T22:43:13+00:00", endDate:"1993-02-27T00:00:00+00:00", malId: 1234 },
    { title: "Fruits Basket", imageUrl: "https://cdn.myanimelist.net/images/anime/1447/99827.jpg?s=e7fe0a2c22c4868dc7b3bde0d61085f9", type: "TV", episodes: "23", startDate:"2019-11-05T22:43:13+00:00", endDate:"2019-11-05T22:43:13+00:00", malId: 1231 },
    { title: "Violette Evergarden", imageUrl: "https://cdn.myanimelist.net/images/anime/1795/95088.jpg?s=9e24a139603a4e0ea8ea055a230b54d5", type: "TV", episodes: "12", startDate:"2019-11-05T22:43:13+00:00", endDate:"1993-02-27T00:00:00+00:00", malId: 1214 }
];

app.get("/", (req, res) => (
    res.send("Homepage")
));

app.get("/dashboard", function(req, res){
    res.render("dashboard", { cards, formatDate });
});

app.post("/dashboard", (req, res) => {
    let { title, imageUrl, type, episodes, startDate, endDate, list, malId } = req.body;
    let newCard = { title, imageUrl, type, episodes, startDate, endDate, list, malId };
    console.log(newCard);
    cards.push(newCard);
    res.redirect("/dashboard");
});

app.get("/search", (req, res) => (
    res.render("search")
));

app.get("/results", function(req, res) {
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

app.listen(port, () => {
    console.log("AnimeKanban App has started.");
});
