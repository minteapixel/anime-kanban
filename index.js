const express = require("express");
const app = express();
const path = require('path');
const request = require('request');
const bodyParser = require("body-parser");
const formatDate = require('./utils/formatDate');
const sassMiddleware = require('node-sass-middleware');
// const mongoose = require("mongoose");

const dashboardRoutes = require("./routes/dashboard");
const indexRoutes = require("./routes/index");
const resultsRoutes = require("./routes/results");

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


app.use("/", indexRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/results", resultsRoutes);


app.listen(port, () => {
    console.log("AnimeKanban App has started.");
});
