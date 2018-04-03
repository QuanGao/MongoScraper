// var databaseUrl = "scraper";
// var collections = ["scrapedData"];
const request = require("request");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function (app) {

  app.get("/", function(req, res) {
    db.News.find({saved: false}, function(err, data){
      if(err) throw err
      console.log("this is data:   "+data)
      res.render("index", {news:data});
    })
   
  });

app.get("/saved", function(req, res) {
    db.News.find({saved: true}, function(err, data){
      if(err) throw err
      console.log("this is data:   "+data)
      res.render("saved", {news:data});
    })
  
});

}