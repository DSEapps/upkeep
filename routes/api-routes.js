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
        db.items.findAll({
            where: {
                userUserId: req.user.user_id
            }
        }).done(function (items) {
            if (items.length > 0) {
                items.forEach(function (item) {
                    itemnames.push(item.type)
                })
            }

            var itemsObj = itemsToSQL(req.body, req.user.user_id);

            if (itemnames.length > 0) {
                for (var i = itemsObj.length - 1; i >= 0; i--) {
                    if (itemnames.includes(itemsObj[i].type)) {
                        itemsObj.splice(i, 1);
                    }
                }
            }

            db.items.bulkCreate(itemsObj).then(function () {
                console.log("done with bulk create of items");
                res.send("/setupdetails");
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
            console.log(data);
            var taskPromises = tasks.map(function (task) {
                return db.tasks.upsert(task)
            })
            Promise.all(taskPromises).then(function (data) {
                console.log(data);
                res.send("/dashboard");
            })
        })
    })
}