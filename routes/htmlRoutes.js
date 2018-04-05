const request = require("request");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function (app) {

    app.get("/scrape", function(req, res) {
    
        request("https://www.pcgamer.com/news/", function(error, response, html) {
         
          const $ = cheerio.load(html);
          let results = [];
          $(".listingResult").each(function(i, element) {
            if(i>0 && i<15){
              const title = $(element).find(".article-name").text().trim();
              const author = $(element).find(".byline span").last().text().trim();
              const time = $(element).find(".published-date").attr("datetime");
              const summary = $(element).find(".synopsis").clone().children().remove().end().text().trim();
              const link =  $(element).children("a").attr("href");
              const photoURL = $(element).find("img").data("src");
              results.push({title, author, time, summary, link, photoURL})
            }
          });

          db.News.find({}, "-_id title", function(err, existingNews){
            if (err) throw err;

            const existingSet= new Set (existingNews.map(a=>a.title));
            const newResults = results.filter(b=>{return !existingSet.has(b.title)});
            const numOfnewItems = newResults.length;

            db.News.create(newResults, function(err, data){
              if (err) throw err; 
              res.json({numOfnewItems})  
            })

          })

        });
  

      });
}