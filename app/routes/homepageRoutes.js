var database = require("../models");
console.log("homepageRoutes PASS");
module.exports = function(app) {

    app.get("/", function(req, res) {
        database.Item.findAll({}).then(function(data) {
            res.render("home", { contents: data });
        });
    }); //home page route
    app.get("/soundActivated", function(req, res) {
        database.Item.findAll({}).then(function(data) {
            res.render("soundActivated", { contents: data });
        });
    }); //sound page route

    app.post("/create", function(req, res) {
        database.Item.create({
            name: req.body.name
        }).then(function(data) {
            res.redirect("/soundActivated");
        });
    });
}; //ends exports function