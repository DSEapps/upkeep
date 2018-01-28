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

        if (!req.user) {
            res.redirect("/login")
        } else {
            db.items.findAll({
                where: {
                    userUserId: req.user.user_id
                },
                include: [db.tasks]
            }).then(function (items_db) {
                if (items_db.length === 0) {
                    res.redirect("/setupitems")
                } else {
                    var items = [];
                    items_db.forEach(function (item) {
                        items.push(item.dataValues);
                    });

                    //add time info and parent items to each task and then push to array
                    var tasks = [];
                    items.forEach(function (item) {
                        item.tasks.forEach(function (rawtask) {
                            var task = rawtask.dataValues;
                            task.parentItem = item.type;
                            var lastDone = moment(task.last_performed);
                            var dueDate = moment(lastDone).add(task.task_frequency, 'months');
                            //give this in month day year format
                            task.dueDate = dueDate.format("YYYY-MM-DD");
                            task.dueDateFormatted = dueDate.format("MMMM Do, YYYY");
                            if (dueDate.isBefore(moment())) {
                                task.overdue = true;
                            } else if (dueDate.isBetween(moment(), moment().add(30, 'days'))) {
                                task.dueSoon = true;
                            }
                            tasks.push(task)
                        })
                    })

                    //Sort by soonest first
                    function compare(a, b) {
                        aDueDate = moment(a.dueDate).unix();
                        bDueDate = moment(b.dueDate).unix();
                        if (aDueDate < bDueDate)
                            return -1;
                        if (aDueDate > bDueDate)
                            return 1;
                        return 0;
                    }
                    tasks.sort(compare);
                    res.render("dashboard", { tasks: tasks });
                }
            });
        }


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


        //*************** */
        // setupDetails(req, db, function(data){
        //     res.render("setupdetail", {userItems: userItems});            
        // })
        //TODO: put everything below this in a separate file; call it likes this ^

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
                    res.render("setupdetail", { userItems: userItems });
                })//End of tasks query then
            }
        })
    })
}


