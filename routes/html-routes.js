var path = require("path");
var fs = require("fs");

module.exports = function (app) {
    //Welcome/login page
    app.get("/", function (req, res) {
        res.render("index", { test: "testing / route" });
    });

    //Create profile page for new users
    app.get("/newprofile", function (req, res) {
        //Fetches data from items.json file and sends to handelbars
        fs.readFile('../db/items.json', "utf8", (err, data) => {
            if (err) throw err;
            console.log(data);
            //EH Note: I'm not sure data needs to be parsed here, haven't tested this code yet.
            var obj = { items: JSON.parse(data) };
            res.render("profile", obj);
        });
    });

    //Edit profile page for existing users
    app.get("/editprofile", function (req, res) {
        //TODO - Add Sequelize query to get user's list of items 
        var obj = {};
        //Note 'profile' is the same hb file as /newprofile GET route.
        res.render("profile", obj);
    })

    //Dashboard of maintenance schedule
    app.get("/dashboard", function (req, res) {
        //TODO - Add Sequelize query to get users activities        
        var obj = {};
        res.render("dashboard", obj);
    });
};

