var db = require("../models");
console.log("homepageRoutes PASS");
module.exports = function(app) {

    app.get("/", function(req, res) {
        db.Item.findAll({}).then(function(data) {
            res.render("entry", { contents: data });
        });
    });
    app.get("/home", function(req, res) {
        db.Item.findAll({}).then(function(data) {
            res.render("home", { contents: data });
        });
    });
    app.get("/melodyMaker", function(req, res) {
        db.Item.findAll({}).then(function(data) {
            res.render("melodyMaker", { contents: data });
        });
    });
    app.get("/loopMaker", function(req, res) {
        db.Item.findAll({}).then(function(data) {
            res.render("loopMaker", { contents: data });
        });
    });
    app.get("/musicMaker", function(req, res) {
        db.Item.findAll({}).then(function(data) {
            res.render("musicMaker", { contents: data });
        });
    });
    app.post('/loopMaker/Save', function(req, res) {
        console.log(req.body);
        db.Item.update({
            synthType: req.body.synthType,
            pitchDecay: req.body.pitchDecay,
            intensity: req.body.intensity
        }, {
            where: { id: 1 }
        }).then(function(data) {
            res.redirect("/loopMaker");
        });
    });
}; //ends exports function