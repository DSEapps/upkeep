// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "Users" model that matches up with DB
var Users = sequelize.define("users", {
  user_email: {
    type: Sequelize.STRING
  },
  date_created: {
    type: Sequelize.DATE
  }
}, {
  timestamps: true
});

// Syncs with DB
Users.sync();

// Makes the Users Model available for other files (will also create a table)
module.exports = Users;
