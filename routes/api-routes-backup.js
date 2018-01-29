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

        console.log("\n\n\n\nREQ.BODY--------------------------------------------------");
        console.log(req.body);

        console.log("\n\nREQ.USER--------------------------------------------------");        
        console.log(req.user);

        // console.log("\n\n\n\nREQ.USER.USERID--------------------------------------------------");        
        // console.log(req.user.user_id);

        // console.log("\n\nREQ.ITEM.TYPE--------------------------------------------------");        
        // console.log(req.body.items[0].type);

        // console.log("\n\nREQ.ITEM.ITEMID--------------------------------------------------");        
        // console.log(req.body.items[0].item_id);

        var items_arr = req.body.items[0];
        var tasks_arr = req.body.tasks[0];

        console.log("\n\n\n\n--------------------------------------------------");
        console.log("items array: \n" + items_arr);
        console.log("tasks array: \n" + tasks_arr);
        console.log("\n\n\n\n--------------------------------------------------");

        var edit_obj_arr = 

        // var edit_obj_arr = [
        //         {
        // /*+*/   "item_id":1,
        //         "type":"Auto",
        // /*O*/   "manufacturer":"Samsung",
        // /*O*/   "model_number":"CoolDuty",
        //         "date_installed":"9999-01-01T05:00:00.000Z",
        // /*O*/   "serial_number":"zzzzzzzz",
        // /*+*/   "complex":true,
        // /*O*/   "items_note":"Why did it not change type to Auto...beacuse it shouldnt",
        //         "createdAt":"2018-01-27T21:41:30.000Z",
        //         "updatedAt":"2018-01-27T21:41:30.000Z",
        // /*+*/   "userUserId":1
        //         },
        //       {
        // /*+*/   "item_id":2,
        // /*O*/   "manufacturer":"Ultra HotMama",
        // /*O*/   "model_number":"Series HOT",
        // /*O*/   "serial_number":"XXXXXXXXX",
        // /*+*/   "complex":true,
        // /*O*/   "items_note":"What in the hot water heater?",
        // /*+*/   "userUserId":1
        //       },
        //       {
        // /*+*/   "item_id":3,
        //         "type":"HVAC",
        // /*O*/   "manufacturer":"Carier",
        // /*O*/   "model_number":"Model G",
        //         "date_installed":"2001-01-01T05:00:00.000Z",
        // /*O*/   "serial_number":"3333333",
        // /*+*/   "complex":true,
        // /*O*/   "items_note":"No more trucks",
        //         "createdAt":"2018-01-27T22:23:16.000Z",
        //         "updatedAt":"2018-01-27T22:23:16.000Z",
        // /*+*/   "userUserId":1
        //       },
        //       {
        // /*+*/   "item_id":4,
        //         "type":"HVAC",
        // /*O*/   "manufacturer":"Wait, this isnt valid...",
        // /*+*/   "complex":true, 
        // /*O*/   "items_note":"Amen!!!",
        // /*+*/   "userUserId":1
        //       }                              
        //     ]

            db.items.bulkCreate(edit_obj_arr, {updateOnDuplicate:
                // These are the only fields we want updated
                ["manufacturer", "model_number", "serial_number", "items_note"]

                // Note that these fields are mandatory and will be overwritten
                // [item_id, complex, userUserId]
            })

        




    })
}