var db = require("../models");
module.exports = function (app, passport) {
    //Authentication route
    app.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    //Authentication callback
    app.get('/login/google/callback',
        passport.authenticate('google', { successRedirect: '/dashboard', failureRedirect: '/' }))

    //Takes data from edit OR create new profile page and sends user back to dashboard
    app.post("/editprofile", function (req, res) {
        //TODO - Add Sequelize query to update OR add items table for user, see UPSERT method.    
        res.redirect("/dashboard")
    })

    //Task data from when user marks task as complete
    app.post("/updatetask", function (req, res) {
        //TODO - Add Sequelize query to update task table for user
        //If the Seqeulize query returns the item updated, let's put that in res.send. We can use that info to update UI.
        res.send("success");        
    });

}