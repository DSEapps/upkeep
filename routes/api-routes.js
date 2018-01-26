var db = require("../models");
module.exports = function (app, db, passport) {
    //Authentication route
    app.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    //Authentication callback
    app.get('/login/google/callback',
        passport.authenticate('google', { successRedirect: '/dashboard', failureRedirect: '/' }))

    //Takes data from edit OR create new items page and sends use to /setupdetails
    app.post("/edititems", function (req, res) {
        //  var array = ["HVAC"];
        //  davidsFunction(array)
        //Take an array of items (this will come from client-side)
        //Get all the JSON stuff from Evan's module
        //build an object for each item in the array using info from JSON 
        //the object needs to be for sequelize
        //Add it to database
        //remember that the user idea is available in req.user.user_id        
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