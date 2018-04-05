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

// {articleId,commentContent}
app.post("/saveComments/:id", function(req, res){

  db.Note.create(req.body).then(dbNote=>{
    console.log("article id in save comments route" + req.params.id )
    return db.News.findOneAndUpdate({ _id: req.params.id }, {$push: {notes: dbNote._id}}, {new:true});
  
  }).then(dbArticle=>{
    console.log("res.json(dbArticle) in save comments route2" + req.params.id )
    res.json(dbArticle)
  }).catch(err=>res.json(err))
})

app.get("/getComments/:id", function(req, res){
  db.News.findOne({ _id: req.params.id })
  .populate("notes")
  .then(function(dbNews){
    console.log("dbnew    " + dbNews)
    res.json(dbNews)
  })
  .catch(err=>res.json(err))

})

// app.get("/deleteComments/:id",(req, res)=>{

// })
}