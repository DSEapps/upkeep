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
                "manufacturer":"Aston Martin",
                "model_number":"DB9",
                "date_installed":"1999-01-01T05:00:00.000Z",
                "serial_number":"zzzzzzzz",
                "complex":true,
                "items_note":"Oh yeah!",
                "createdAt":"2018-01-27T21:41:30.000Z",
                "updatedAt":"2018-01-27T21:41:30.000Z",
                "userUserId":1
                },
              {
                "item_id":2,
                "manufacturer":"Super HVAC",
                "model_number":"H Series",
                "serial_number":"XXXXXXXXX",
                "complex":true,
                "items_note":"What in the world?",
                "userUserId":1
              },
              {
        /**/    "item_id":3,
                "type":"HVAC",
                "manufacturer":"Carrier",
                "model_number":"X-Series",
                "date_installed":"2001-01-01T05:00:00.000Z",
                "serial_number":"123456789X",
        /**/    "complex":true,
                "items_note":"Will this work?",
                "createdAt":"2018-01-27T22:23:16.000Z",
                "updatedAt":"2018-01-27T22:23:16.000Z",
        /**/    "userUserId":1
              },
              {
                "item_id":4,
                "type":"HVAC",
                "manufacturer":"God",
                "complex":true, 
                "userUserId":1
              }                              
            ]

            db.items.bulkCreate(my_obj_arr, {updateOnDuplicate:
                // These are the only fields we want updated
                ["manufacturer", "model_number", "serial_number", "items_note"]
            })

        




    })
}