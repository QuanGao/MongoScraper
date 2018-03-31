// var databaseUrl = "scraper";
// var collections = ["scrapedData"];
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });
// var mongojs = require("mongojs");

var request = require("request");
var cheerio = require("cheerio");

module.exports = function (app) {

    app.get("/", function(req, res) {
        res.render("index");
      });

    app.get("/scrape", function(req, res) {
    
        request("https://www.pcgamer.com/news/", function(error, response, html) {
         
          const $ = cheerio.load(html);
          let results = [];
          $(".listingResult").each(function(i, element) {
            if(i>0){
              const title = $(element).find(".article-name").text();
              const author = $(element).find(".byline span").last().text();
              const time = $(element).find(".published-date").attr("datetime");
              const summary = $(element).find(".synopsis").clone().children().remove().end().text();
              const link =  $(element).children("a").attr("href");
              const photoURL = $(element).find("img").data("src");
              results.push({title, author, time, summary, link, photoURL})
            }
            console.log(results)
            // If this found element had both a title and a link
            // if (title && link) {
            //   // Insert the data in the scrapedData db
            //   db.scrapedData.insert({
            //     title: title,
            //     link: link
            //   },
            //   function(err, inserted) {
            //     if (err) {
            //       // Log the error if one is encountered during the query
            //       console.log(err);
            //     }
            //     else {
            //       // Otherwise, log the inserted data
            //       console.log(inserted);
            //     }
            //   });
            // }
          });
        });
      
        // Send a "Scrape Complete" message to the browser
        res.send("Scrape Complete");
      });
}