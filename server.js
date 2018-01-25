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
    function (accessToken, refreshToken, profile, done) {
        Users.findOne({ where: { google_id: profile.id } }).then(function (user) {
            if (!user) {
                console.log(profile);
                //TODO new user! add a sequelize create statement to make a new user in our db and return the created object. 
                //Info needed will be found in the `profile` object
            } else {
                return done(null, user);
            }
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
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

