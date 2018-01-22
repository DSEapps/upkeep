// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "Items" model that matches up with DB
var Items = sequelize.define("items", {
  type: {
    type: Sequelize.STRING
  },
  manufacturer: {
    type: Sequelize.STRING
  },
  model_number: {
    type: Sequelize.STRING
  },
  date_manufactured: {
    type: Sequelize.DATE
  },
  serial_number: {
    type: Sequelize.STRING
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  items_note: {
    type: Sequelize.TEXT
  }
}, {
  timestamps: true
});

// Syncs with DB
Items.sync();

// Makes the Items Model available for other files (will also create a table)
module.exports = Items;
