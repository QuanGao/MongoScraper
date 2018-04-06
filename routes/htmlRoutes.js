const request = require("request");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function (app) {
    
    app.get("/", (req, res)=>{
        db.News.find({
            saved: false
        }, (err, unsavedNews)=>{
            if (err) throw err
            res.render("index", {
                unsavedNews
            });
        })
    });

    app.get("/saved", (req, res)=>{
        db.News.find({
            saved: true
        }, (err, savedNews)=>{
            if (err) throw err
            res.render("saved", {
                savedNews
            });
        })
    });

}