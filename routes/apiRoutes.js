// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });
// var mongojs = require("mongojs");

const request = require("request");
const cheerio = require("cheerio");

const db = require("../models");
module.exports = function (app) {

    app.get("/saved", function(req, res) {
        db.News.find({saved:true}, function(err, found) {
          if(err) throw err;
          res.json(found);
    
        });
      });

}