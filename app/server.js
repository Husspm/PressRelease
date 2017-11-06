//dependencies
var express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    app = express(),
    method = require("method-override"),
    PORT = process.env.PORT || 8080,
    db = require("./models");

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(method("_method"));
//initalizing the listener




db.sequelize.sync({}).then(function() {

    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});

//handlebars for rendering html
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//routes 
require("./routes/homepageRoutes")(app);