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

    app.get("/", function(req, res) {
        db.News.find({saved: false}, function(err, data){
          if(err) throw err
          console.log("this is data:   "+data)
          res.render("index", {news:data});
        })
       
      });

    app.get("/scrape", function(req, res) {
    
        request("https://www.pcgamer.com/news/", function(error, response, html) {
         
          const $ = cheerio.load(html);
          // let results = [];
          $(".listingResult").each(function(i, element) {
            if(i>0 && i<11){
              const title = $(element).find(".article-name").text();
              const author = $(element).find(".byline span").last().text();
              const time = $(element).find(".published-date").attr("datetime");
              const summary = $(element).find(".synopsis").clone().children().remove().end().text();
              const link =  $(element).children("a").attr("href");
              const photoURL = $(element).find("img").data("src");
              // const photoURL = $(element).find("img").data("srcset").split(" ")[4];
              // results.push({title, author, time, summary, link, photoURL})
              // const news_item = new db.News ({title, author, time, summary, link, photoURL});

              const query = {title, author, time, summary, link, photoURL},
                    update = {},
                    options = {upsert: true, new: true, setDefaultsOnInsert:true};

              db.News.findOneAndUpdate(query, update, options, function(err, result){
                  if(err) throw err;
                  // console.log(result)
              })

            //   news_item.save(function(err){
            //     if(err) throw err;
            //     console.log("saved")
            //   })
            //   console.log(news_item)
            }

          });
        });
      
        // Send a "Scrape Complete" message to the browser
        res.render("index", {msg:"Scrape Complete"});
      });
}