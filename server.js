var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");

// === Our scraping tools ===
var axios = require("axios");
var cheerio = require("cheerio");

// === Requiring all models and initializing express ===
var app = express();
var db = require("./models");
var PORT = process.env.PORT || 3000;
app.use(express.static("public"));

// === Using morgan logger for logging requests ===
app.use(logger("dev"));

// === Parsing application body as a JSON ===
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// === Setting Handlebars ===
var exhbs = require("express-handlebars");
app.engine("handlebars", exhbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });