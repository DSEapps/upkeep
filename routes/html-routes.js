var path = require("path");
var makeItemsArray = require("../modules/makeItemsArray.js");
var filterArray = require("../modules/filterArray.js");
var addTasksToItems = require("../modules/taskToItems.js");
var setupDetails = require("../modules/setupDetails.js");
var dashboard = require("../modules/dashboard.js")


module.exports = function (app, db) {
    //Initial landing page. Will send user straight to dashboard if authenticated.
    app.get("/", function (req, res) {
        if (req.user) {
            res.redirect("/dashboard")
        } else {
            res.render("landing");
        }
    });

    //Log in page
    app.get("/login", function (req, res) {
        res.render("register");
    })

    //Dashboard of maintenance schedule
    app.get("/dashboard", function (req, res) {
        if (!req.user) {
            res.redirect("/login")
        } else {
            dashboard(req, db, function (data) {
                res.render("dashboard", { tasks: data });
            })


        }


    });

    //Dashboard of maintenance schedule by item
    app.get("/dashboardbyitem", function (req, res) {
        var obj = getDashData(app);
        res.render("dashboardbyitem", obj);
    });

    //Create/edit items for users
    app.get("/setupitems", function (req, res) {
        if (!req.user) {
            res.redirect("/login");
        }
        var allItems = require('../public/data/items.js')();
        db.items.findAll({
            where: {
                userUserId: req.user.user_id
            }
        }).then(function (items) {
            if (items.length === 0) {
                res.render("setupitems", { items: allItems });
            } else {
                var itemnames = makeItemsArray(items);
                allItems.forEach(function (item) {
                    if (itemnames.includes(item.item_name)) {
                        item.selected = true;
                    } else {
                        item.selected = false;
                    }
                })
                res.render("setupitems", { items: allItems });
            }
        });
    });

    //Create/edit tasks for users
    app.get("/setupdetails", function (req, res) {
        if (!req.user) {
            res.redirect("/login");
        }
        setupDetails(req, db, null, function (data) {
            res.render("setupdetail", { userItems: data });
        })
    })
}


