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
        //         }
        // ]

        var obj_arr = req.body.items;

        // console.log("\n\n\nREQ BODY ITEMS ARR---------------------");
        // console.log(obj_arr);

        var items_obj_arr = [];

        // loop to iterate thru req.body (obj_arr)
        for (i = 0; i < obj_arr.length; i++){
            var itemObj = obj_arr[i];

            // loop to search thru json items/tasks
            for (j=0; j < json.length; j++){

                // check to see if item name in json object (item_name) matches item object (type)
                if(json[j].item_name===obj_arr[i].type){

                    // if match, will add key "complex" with value in json
                    itemObj.complex = json[j].complex;
                }

                // add user_id field to item object (and convert to string)
                itemObj.userUserId = req.user.user_id.toString();
            }

            // push modified item object (itemObj) to items_obj_array to be written to database
            items_obj_arr.push(itemObj);
            console.log(itemObj);

        }




        db.items.bulkCreate(items_obj_arr, {updateOnDuplicate:
            // These are the only fields we want updated
            ["manufacturer", "model_number", "serial_number", "items_note"]

            // Note that these fields are mandatory and will be overwritten
            // [item_id, complex, userUserId]
        })

        




    })
}