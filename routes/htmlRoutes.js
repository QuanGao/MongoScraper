const request = require("request");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function (app) {

    app.get("/scrape", function(req, res) {
    
        request("https://www.pcgamer.com/news/", function(error, response, html) {
         
          const $ = cheerio.load(html);
          let results = [];
          $(".listingResult").each(function(i, element) {
            if(i>0 && i<100){
              const title = $(element).find(".article-name").text().trim();
              const author = $(element).find(".byline span").last().text().trim();
              const time = $(element).find(".published-date").attr("datetime");
              const summary = $(element).find(".synopsis").clone().children().remove().end().text().trim();
              const link =  $(element).children("a").attr("href");
              const photoURL = $(element).find("img").data("src");
              results.push({title, author, time, summary, link, photoURL})
            }
          });

          db.News.find({}, "-_id", function(err, existingNews){
            if (err) throw err;

            const existingSet= new Set (existingNews.map(a=>a.title));
            console.log("existingNews" +existingNews)
            const newResults = results.filter(b=>{return !existingSet.has(b.title)});
            console.log("newResults" + newResults)

            const numOfnewItems = newResults.length;
            console.log("numOfnewItems "+ numOfnewItems )

            const unsavedNews = existingNews.filter(a=>!a.saved).concat(newResults)

            db.News.create(newResults, function(err, data){
              if (err) throw err;             
              res.render("index", {news:unsavedNews, numOfnewItems:numOfnewItems});
  
            })

          })

        });
  

      });
}