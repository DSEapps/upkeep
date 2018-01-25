var path = require("path");
var fs = require("fs");

module.exports = function (app) {
    //Initial landing page. Will send user straight to dashboard if authenticated.
    app.get("/", function (req, res) {
        if (req.user) {
            res.redirect("/dashboard")
        } else {
            res.render("landing");
        }
    });

    app.get("/login", function(req,res){
        res.render("register");
    })
   
    //Dashboard of maintenance schedule
    app.get("/dashboard", function (req, res) {
        //TODO - Add Sequelize query to get all users activities and items            
        //if user doesn't have any items (by extension, no activities), res.redirect("/setup")
        //if user doesn't exist, res.redirect to ("/login")
        //else render dashboard with all the data
        var obj = {};
        res.render("dashboard", obj);
    });

    //Create profile page for new users
    app.get("/setup", function (req, res) {
        //Fetches data from items.json file and sends to handelbars
        fs.readFile('../db/items.json', "utf8", (err, data) => {
            if (err) throw err;
            console.log(data);
            //EH Note: I'm not sure data needs to be parsed here, haven't tested this code yet.
            var obj = { items: JSON.parse(data) };
            console.log("derp");
            res.render("setup", obj);
        });
    });

    //Edit profile page for existing users
    app.get("/editprofile", function (req, res) {
        //TODO - Add Sequelize query to get user's list of items 
        var obj = {};
        //Note 'profile' is the same hb file as /newprofile GET route.
        res.render("profile", obj);
    })


};

