var express = require("express");
var mongoose = require("mongoose");
// var logger = require("morgan");

// === Our scraping tools ===
var cheerio = require("cheerio");
var axios = require("axios");

// === Requiring all models and initializing express ===
var app = express();
var db = require("./models");
var PORT = process.env.PORT || 3000;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

app.use(express.static("public"));

// === Configure middleware ===

// // === Using morgan logger for logging requests ===
// app.use(logger("dev"));

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

  // === Routes ===

  app.get("/", function(req, res) {
      res.render("index");
  })

  // === A GET route for scrpaing the website === 
  app.get("/scrape", function(req, res) {
      // === First we grab the body of the html with axios ===
      axios.get("https://www.wsj.com/").then(function(response) {
          // === Then we load that into cheerio and save it to $ for a shorthand selector ===
          var $ = cheerio.load(response.data);
            // === Now we grab every h2 tag within an article tag === 
          $("h13[class^='WSJTheme--headline']").each(function(i, element) {
            // === Save the h2 info in an empty result object === 
            var result = [];

            // === Add text and href of everylink, and save them as properties of the result object ===
            result.title = $(this).children("h13").text();
            result.link = $(this).children(".class href").attr("href");

            result.push({
                title: title,
                link: link
            });

            // === Create a new NewsArticles using the 'result' object built from scraping ===
            db.NewsArticle.create(result)
                .then(function(NewsArticle) {
                    // === Viewing the newly added result === 
                    console.log(NewsArticle);
                })
                .catch(function(err) {
                    // === Logging an error if occured ===
                    console.log(err);
                });
          });
          // === Sending a message the to client the scrape is complete ===
          res.send("Scrape has been Completed");
      });
  });

  // === Route for getting all NewsArticles from the db ===
  app.get("/NewsArticle", function(req, res) {
      // === Grabbing every document in the NewsArticle collection
      db.NewsArticle.find({})
        .then(function(dbNewsArticle) {
            // === If we were successful in finding NewsArticle, send them back to client ===
            res.json(dbNewsArticle);
            console.log(storingArticle);
        })
        .catch(function(err) {
            // === If an error occurred, send it to the client ===
            res.json(err);
        });
  });