var path = require("path");
var fs = require("fs");
var getDashData = require("../modules/getDashData.js");

module.exports = function (app) {
    //Initial landing page. Will send user straight to dashboard if authenticated.
    app.get("/", function (req, res) {
        if (req.user) {
            res.redirect("/dashboard")
        } else {
            res.render("landing");
        }
    });

    app.get("/login", function (req, res) {
        res.render("register");
    })

    //Dashboard of maintenance schedule
    app.get("/dashboard", function (req, res) {
        //Stuff below will need to be a module! will be used in both dash routes
        //TODO - Add Sequelize query to get all users activities and items            
        //IF user doesn't have any items (by extension, no activities), res.redirect("/setup")
        //if user doesn't exist, res.redirect to ("/login")        
        //ELSE calculate due dates for each task and add that data to each task object
        // aaaaannnd sort by soonest
        // aaaannd add overdue and due soon booleans to the objects to make Scott's life easier 
        // render dashboard with all the data
        var obj = {};
        res.render("dashboard", obj);
    });

    //Dashboard of maintenance schedule
    app.get("/dashboardbyitem", function (req, res) {
        //Reuse function from 
        var obj = {};
        res.render("dashboardbyitem", obj);
    });

    //Details for page for item or task (details page will the same for each)
    app.get("/details", function (req, res) {
        console.log(req.route.path);
        var obj = {};
        res.render("details", obj);
    });

    //Create profile page for new users
    app.get("/setup", function (req, res) {
        //Fetches data from items.json file and sends to handelbars
        fs.readFile('./public/data/items.json', "utf8", (err, data) => {
            if (err) throw err;
            //EH Note: I'm not sure `data` needs to be parsed here, haven't tested this code yet.
            var obj = { items: JSON.parse(data) };
            res.render("setup", obj);
        });
    });
};

