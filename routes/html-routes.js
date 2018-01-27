var path = require("path");
var fs = require("fs");
var getDashData = require("../modules/getDashData.js");

module.exports = function (app, db) {
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
        db.items.findAll({
            where: {
                userUserId: req.user.user_id
            }
        }).then(function (item) {
            if (!req.user) {
                res.redirect("/login")
            } else if (item.length === 0) {
                res.redirect("/setupitems")
            } else {
                var obj = getDashData(app);
                res.render("dashboard", obj);
            }
        });


        //TODO - create getDashData over in the modules folder. It needs to:
        //Do Sequelize query to get all user's activities and items            
        //IF user doesn't have any items (by extension, no activities), res.redirect("/setup")
        //if user doesn't exist, res.redirect to ("/login")        
        //ELSE calculate due dates for each task and add that data to each task object
        // aaaaannnd sort by soonest
        // aaaannd add overdue and due soon booleans to the objects to make Scott's life easier 
        // render dashboard with all the data

    });

    //Dashboard of maintenance schedule by item
    app.get("/dashboardbyitem", function (req, res) {
        var obj = getDashData(app);
        res.render("dashboardbyitem", obj);
    });

    //Details for page for item or task (details page will the same for each)
    app.get("/details", function (req, res) {
        var obj = {};
        res.render("details", obj);
    });

    //Create/edit items for users
    app.get("/setupitems", function (req, res) {
        var json = require('../public/data/items.json');
        var obj;
        db.items.findAll({
            where: {
                userUserId: req.user.user_id
            }
        }).then(function (items) {
            if (!req.user) {
                res.redirect("/login")
            } else if (items.length === 0) {
                res.render("setupitems", { items: json });
            } else {
                var itemnames = [];
                items.forEach(function (item) {
                    itemnames.push(item.type);
                })
                json.forEach(function (item) {
                    if (itemnames.includes(item.item_name)) {
                        item.selected = true;
                    } else {
                        item.selected = false;
                    }
                })
                res.render("setupitems", { items: json });
            }
        });

    });

    //Create/edit tasks for users
    app.get("/setupdetails", function (req, res) {
        console.log(req.route.path);
        res.render("setupdetail");
    });
};

