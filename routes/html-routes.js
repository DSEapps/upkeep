var path = require("path");
var fs = require("fs");
var getDashData = require("../modules/getDashData.js");
var makeItemsArray = require("../modules/makeItemsArray.js");
var filterArray = require("../modules/filterArray.js");
var addTasksToItems = require("../modules/taskToItems.js");
var moment = require('moment');

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

        var allItems = require('../public/data/items.js')();
        db.items.findAll({
            where: {
                userUserId: req.user.user_id
            }
        }).then(function (items) {
            if (items.length === 0) {
                res.redirect("/setupitems")
            } else {
                db.tasks.findAll({
                    where: {
                        userUserId: req.user.user_id
                    }
                }).then(function (tasks) {
                    //Adds tasks from main list into each item              
                    var userItems = addTasksToItems(items, allItems);

                    //Puts all tasks into one big array to make it easier to add in user's data
                    var allTasks = [];
                    userItems.forEach(function (item) {
                        allTasks = allTasks.concat(item.tasks)
                    });

                    //Adding in user data to tasks, if it's there
                    allTasks.forEach(function (allTask) {
                        tasks.forEach(function (userTask) {
                            if (userTask.task_name === allTask.task_name) {
                                allTask.last_performed = moment(userTask.last_performed).format("YYYY-MM-DD");
                                allTask.task_note = userTask.task_note;
                            }
                        })
                    });

                    //update items data with tasks that have user data in them
                    userItems.forEach(function (item) {
                        item.tasks.forEach(function (task) {
                            //if it's in all task, replace it
                            allTasks.forEach(function (allTask) {
                                if (allTask.task_name === task.task_name) {
                                    task = allTask;
                                }
                            })
                        })
                    })
                    res.render("setupdetail", userItems);
                })//End of tasks query then
            }
        })
    })
}


