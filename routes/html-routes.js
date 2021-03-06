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
            dashboard(req, res, db, function (data) {
                var referrer = require('../modules/getReferrer.js')(req, ["/setupdetails", "/login"]);
                res.render("dashboard", { referrer: referrer, tasks: data });
            })
        }
    });

    //Create/edit items for users
    app.get("/setupitems", function (req, res) {
        if (!req.user) {
            res.redirect("/login");
        } else {
            var referrer = require('../modules/getReferrer.js')(req, ["/setupdetails", "/login", "/dashboard"]);
            var allItems = require('../public/data/items.js')();
            allItems.sort(function (a, b) {
                if (a.item_name.toLowerCase() < b.item_name.toLowerCase()) return -1;
                if (a.item_name.toLowerCase() > b.item_name.toLowerCase()) return 1;
                return 0;
            })

            db.items.findAll({
                where: {
                    userUserId: req.user.user_id
                }
            }).then(function (items) {
                if (items.length === 0) {
                    res.render("setupitems", { referrer: referrer, items: allItems });
                } else {
                    var itemnames = makeItemsArray(items);
                    allItems.forEach(function (item) {
                        if (itemnames.includes(item.item_name)) {
                            item.selected = true;
                        } else {
                            item.selected = false;
                        }
                    })
                    res.render("setupitems", { referrer: referrer, items: allItems });
                }
            });
        }
    });

    //Create/edit tasks for for one item via dashboard
    app.get("/setupdetails/:id", function (req, res) {
        var itemid = req.params.id;
        if (!req.user) {
            res.redirect("/login");
        } else {
            setupDetails(req, res, db, itemid, function (data) {
                var referrer = require('../modules/getReferrer.js')(req, ["/setupitems", "/dashboard"]);
                res.render("setupdetail", { referrer: referrer, items: data });
            })
        }
    })

    //Create/edit tasks for users    
    app.get("/setupdetails", function (req, res) {
        if (!req.user) {
            res.redirect("/login");
        } else {
            setupDetails(req, res, db, null, function (data) {
                var referrer = require('../modules/getReferrer.js')(req, ["/setupitems", "/dashboard"]);
                res.render("setupdetail", { referrer: referrer, items: data });
            })
        }
    })

}


