var database = require("../models");
console.log("homepageRoutes PASS");
module.exports = function(app) {

    app.get("/", function(req, res) {
        database.Item.findAll({}).then(function(data) {
            res.render("entry", { contents: data });
        });
    });
    app.get("/home", function(req, res) {
        database.Item.findAll({}).then(function(data) {
            res.render("home", { contents: data });
        });
    });
    app.get("/melodyMaker", function(req, res) {
        database.Item.findAll({}).then(function(data) {
            res.render("melodyMaker", { contents: data });
        });
    });
    app.get("/loopMaker", function(req, res) {
        database.Item.findAll({}).then(function(data) {
            res.render("loopMaker", { contents: data });
        });
    });
    app.get("/musicMaker", function(req, res) {
        database.Item.findAll({}).then(function(data) {
            res.render("musicMaker", { contents: data });
        });
    });
}; //ends exports function