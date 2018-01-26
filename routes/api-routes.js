var db = require("../models");
var itemsToSQL = require("../modules/itemsToSQL.js");

module.exports = function (app, db, passport) {
    //Authentication route
    app.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    //Authentication callback
    app.get('/login/google/callback',
        passport.authenticate('google', { successRedirect: '/dashboard', failureRedirect: '/' }))

    //Takes data from edit OR create new items page and sends user to /setupdetails
    app.post("/edititems", function (req, res) {

        // Dummy variables to test db.items.create
        //  var array = ["HVAC"];
        //  var newItemObj = {
        //     type: "House",
        //     manufacturer: "NULL",
        //     model_number: "NULL",
        //     date_installed: "2013-01-01 00:00:00",
        //     serial_number: "NULL",
        //     complex: 0,
        //     items_note: "Lorem ipsum dolor sit amet.",
        //     userUserId: 1
        // };

        // POST route for saving a new item (assuming user_id)
        db.items.create(

            itemsToSQL();
        // Comment out manually created object
        // {
        //   type:             newItemObj.type,
        //   manufacturer:     newItemObj.manufacturer,
        //   model_number:     newItemObj.model_number,
        //   date_installed:   newItemObj.date_installed,
        //   serial_number:    newItemObj.serial_number,
        //   complex:          newItemObj.complex,
        //   items_note:       newItemObj.items_note,
        //   userUserId:       newItemObj.userUserId
        // }

        )
        .then(function(dbItems) {
            res.json(dbItems);
        });

        //  davidsFunction(array)
        //Take an array of items (this will come from client-side)
        //Get all the JSON stuff from Evan's module
        //build an object for each item in the array using info from JSON 
        //the object needs to be for sequelize
        //Add it to database
        //remember that the user id is available in req.user.user_id        
    })
    //NOTE!!! EH - This route may not be right.
    //Takes data from edit OR create new profile page and sends user back to dashboard
    app.post("/editprofile", function (req, res) {
        //TODO - Add Sequelize query to update OR add items table for user, see UPSERT method.    
        res.redirect("/dashboard")
    })

    //NOTE!!! EH - This route may not be right.
    //Task data from when user updates task data in `details` view
    app.post("/updatetask", function (req, res) {
        //TODO - Add Sequelize query to update task table for user
        //If the Seqeulize query returns the item updated, let's put that in res.send. We can use that info to update UI (?)
        res.send("success");
    });

}