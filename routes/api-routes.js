var db = require("../models");
var itemsToSQL = require("../modules/itemsToSQL.js");
var filterArray = require("../modules/filterArray.js");
var json = require("../public/data/items.js")();


module.exports = function (app, db, passport) {
    //Authentication route
    app.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    //Authentication callback
    app.get('/login/google/callback',
        passport.authenticate('google', { successRedirect: '/dashboard', failureRedirect: '/' }))

    //Takes data from edit OR create new items page and sends user to /setupdetails
    app.post("/edititems", function (req, res) {
        var itemnames = [];
        var toDeleteIds = [];

        db.items.findAll({
            where: {
                userUserId: req.user.user_id
            }
        }).done(function (items) {
            //Make array of items user already has
            if (items.length > 0) {
                items.forEach(function (item) {
                    itemnames.push(item.type)
                })
            }

            //make an object for the Sequelize bulk create
            var itemsObj = itemsToSQL(req.body, req.user.user_id);

            if (itemnames.length > 0) {
                for (var i = itemsObj.length - 1; i >= 0; i--) {
                    if (itemnames.includes(itemsObj[i].type)) {
                        itemsObj.splice(i, 1);
                    }
                }



                var toDelete = [];
                itemnames.forEach(function (itemInDB, index) {
                    var deleteIt = true;
                    req.body.forEach(function (checkedItem) {
                        if (checkedItem === itemInDB) {
                            deleteIt = false;
                        }
                    })
                    if (deleteIt) {
                        toDelete.push(itemInDB)
                    }
                })

                toDelete.forEach(function (itemToDelete) {
                    items.forEach(function (itemInDB) {
                        if (itemToDelete === itemInDB.type) {
                            toDeleteIds.push(itemInDB.item_id);
                        }
                    })
                })
            }

            db.items.bulkCreate(itemsObj).then(function () {
                if (toDeleteIds.length > 0) {
                    var delPromises = toDeleteIds.map(function (delId) {
                        return db.items.destroy({
                            where: {
                                item_id: delId
                            }
                        })
                    })

                    Promise.all(delPromises).then(function () {
                        res.send("/setupdetails");
                    })


                } else {
                    res.send("/setupdetails");
                }
            })

        })
    })


    //Takes data from setupdetails page
    app.post("/editdetails", function (req, res) {
        var items = req.body.items;
        var tasks = req.body.tasks;
        var allTheTasks = require("../modules/aggregateTasks.js")();

        //Adds in our data into the user's task input
        tasks.forEach(function (task) {
            task.userUserId = req.user.user_id;
            allTheTasks.forEach(function (sourceTask) {
                if (sourceTask.task_name === task.task_name) {
                    task.task_frequency = sourceTask.task_frequency;
                }
            })
        })

        var itemPromises = items.map(function (item) {
            return db.items.update(item, {
                where: {
                    item_id: item.item_id
                }
            })
        })

        Promise.all(itemPromises).then(function (data) {
            var taskPromises = tasks.map(function (task) {
                return db.tasks.upsert(task)
            })
            Promise.all(taskPromises).then(function (data) {
                res.send("/dashboard");
            })
        })
    })
}