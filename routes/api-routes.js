var db = require("../models");
var itemsToSQL = require("../modules/itemsToSQL.js");
var filterArray = require("../modules/filterArray.js")

module.exports = function (app, db, passport) {
    //Authentication route
    app.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    //Authentication callback
    app.get('/login/google/callback',
        passport.authenticate('google', { successRedirect: '/dashboard', failureRedirect: '/' }))

    //Takes data from edit OR create new items page and sends user to /setupdetails
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

        var my_obj_arr = [
              {
                "item_id":1,
                "type":"Auto",
                "manufacturer":"Honda",
                "model_number":"Pilot",
                "date_installed":"1999-01-01T05:00:00.000Z",
                "serial_number":"NULL",
                "complex":true,
                "items_note":"NULL",
                "createdAt":"2018-01-27T21:41:30.000Z",
                "updatedAt":"2018-01-27T21:41:30.000Z",
                "userUserId":1,
                "tasks":[
                  {
                    "task_name":"Service checkup",
                    "task_reminder_text":"It's time to get a 60,000 mile service checkup on your car.  You want everything to run in top shape, don't you?",
                    "task_frequency":"24"
                  },
                  {
                    "task_name":"State inspection",
                    "task_reminder_text":"It's time to get your annual State Inspectiom for your car.  You can't hide forever!",
                    "task_frequency":"12"
                  },
                  {
                    "task_name":"Replace battery",
                    "task_reminder_text":"It's been 3 years since you've replaced your car battery.  Time to replace it before you get stuck!",
                    "task_frequency":"36"
                  },
                  {
                    "task_name":"Replace tires",
                    "task_reminder_text":"Your car tires are 4 years old, time to replace them.  Better safe then sorry!",
                    "task_frequency":"48"
                  }
                ]
              },
              {
                "item_id":2,
                "date_installed":"2018-01-01T05:00:00.000Z",
                "serial_number":"NULL",
                "complex":true,
                "items_note":"NULL",
                "createdAt":"2018-01-27T22:23:16.000Z",
                "updatedAt":"2018-01-27T22:23:16.000Z",
                "userUserId":1,
                "tasks":[

                ]
              }
            ]

            db.items.bulkCreate(my_obj_arr, {updateOnDuplicate: true
            })


    })
}