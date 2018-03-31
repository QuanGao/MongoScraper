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
        // Make a request for the news section of `ycombinator`
        request("https://www.pcgamer.com/news/", function(error, response, html) {
          // Load the html body from request into cheerio
          const $ = cheerio.load(html);
          // For each element with a "title" class
          $("h3.article-name").each(function(i, element) {
      
              const title = $(element).text();
              const summary = $(element).text();
              console.log(title)
            // Save the text and href of each link enclosed in the current element
            // var title = $(element).children("a").text();
            // var link = $(element).children("a").attr("href");
      
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