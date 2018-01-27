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
        console.log(req.body);
        // itemsObj is the SQL "items" array of object from itemsToSQL
        var itemsObj = itemsToSQL();

        // iterate thru the array and create items entries in the database
        for(i=0; i<itemsObj.length; i++){
            // console.log(itemsObj[i]);
            db.items.create(itemsObj[i]).then(function(dbItems) {
                res.json(dbItems);
            });
        }
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