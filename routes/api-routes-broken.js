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

        var my_item_obj_arr = [
              {
                "item_id":1,
                "manufacturer":"Honda",
                "serial_number":"NULL",
                "items_note":"NULL",
              },
              {
                "item_id":2,
                "manufacturer":"Carrier",
                "serial_number":"NULL",
                "items_note":"NULL"
              }
            ]

        var my_task_obj_arr = [
              {
                "task_id":1,
                "task_name":"Honda",
                "last_performed":"1900-01-28 21:34:23",
                "task_frequency":"NULL",
                "task_note":"HOLY MOLY!!"
                // "itemItemId":"NULL",
                // "userUserId":"NULL"
              },
              {
               "task_id":2,
                "task_name":"Honda",
                "last_performed":"1900-01-28 21:34:23",
                "task_frequency":"NULL",
                "task_note":"THIS WORKS!!"
                // "itemItemId":"NULL",
                // "userUserId":"NULL"
              }
            ]


            db.items.bulkCreate(my_item_obj_arr, {updateOnDuplicate: 
                ["manufacturer", "serial_number", "items_notes"]
            }).then(function(){
                db.tasks.bulkCreate(my_task_obj_arr, {updateOnDuplicate: 
                    ["last_performed", "task_note"]                
                });

            })
    })

}    