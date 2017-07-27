var database = require("../models");
console.log("homepageRoutes PASS");
module.exports = function(app) {

    app.get("/", function(req, res) {
        database.Item.findAll({}).then(function(data) {
            res.render("entry", { contents: data });
        });
    }); //home page route
    app.get("/soundGenerator", function(req, res) {
        database.Item.findAll({}).then(function(data) {
            res.render("home", { contents: data });
        });
    }); //home page route
}; //ends exports function