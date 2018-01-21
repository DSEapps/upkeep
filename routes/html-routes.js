var path = require("path");
module.exports = function (app) {
    //Welcome page route
    app.get("/", function (req, res) {
        res.render("index", {test:"testing / route"});
    });

    app.get("/dashboard", function (req, res) {
        res.render("dashboard", {test:"testing dashboard route"});
    });
};

