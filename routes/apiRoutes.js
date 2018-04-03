// var databaseUrl = "scraper";
// var collections = ["scrapedData"];
const request = require("request");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function (app) {

  app.get("/", function(req, res) {
    db.News.find({saved: false}, function(err, unsavedNews){
      if(err) throw err
      res.render("index", {unsavedNews});
    })
   
  });

app.get("/saved", function(req, res) {
    db.News.find({saved: true}, function(err, savedNews){
      if(err) throw err
      console.log("this is savedNews:   "+savedNews)
      res.render("saved", {savedNews});
    }) 
});

app.get("/save/:id", (req, res)=>{
    db.News.findOneAndUpdate({_id: req.params.id}, {$set: {saved: true}},{new:true}).then(
      function(docs){
        console.log(docs)
        if(docs){
          res.json("article saved")
        }else{
          res.json("article doesn't exist")
        }
      }
    ).catch(err=>res.json(err))
})

app.get("/unsave/:id", (req, res)=>{
  console.log("lokk"+ req.params.id)
  db.News.findOneAndUpdate({_id: req.params.id}, {$set: {saved: false}},{new:true}).then(
    function(docs){
      console.log("docs     " + docs)
      if(docs){
        res.json("article unsaved")
      }else{
        res.json("article doesn't exist")
      }
    }
  ).catch(err=>res.json(err))
})

}