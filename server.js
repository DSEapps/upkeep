var express = require("express");
var bodyParser = require("body-parser");

//Environment variables
require('dotenv').config();
var client_id = process.env.GOOGLE_CLIENT_ID;
var client_secret = process.env.GOOGLE_CLIENT_SECRET;

//Authentication modules
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(express.static("public"));

//EH: Not exactly sure what urlencoded does; review
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Handlebars has Express's view engine
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Google authentication configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    function (accessToken, refreshToken, profile, cb) {
        
        //EH: Below is MongoDB code from sample code I'm using. We need to add a Sequelize query here. 
        //This is where we'd create new user, or push user through to dashboard.
        
        // this is basically just using the profile from Google, but we want it to be using OUR user record.  
        // then, i think that info will be available at req.user
        
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        return cb(null, profile);
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

//EH: I think these are needed by the serialize/deserialize passport functions
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

//Routes
//EH Note - we may need to pass "db" in as parameters
require("./routes/html-routes.js")(app, passport);
require("./routes/api-routes.js")(app, passport);

//EH: I omitted the {force:true} argument from the sync method; let's discuss as a team
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});

