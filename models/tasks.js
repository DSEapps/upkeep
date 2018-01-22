// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
// var sequelize = require("../config/connection.js");

// Creates a "Items" model that matches up with DB
var Tasks = sequelize.define("tasks", {
  task_name: {
    type: Sequelize.STRING
  },
  item_id: {
    type: Sequelize.INTEGER
  },
  last_performed: {
    type: Sequelize.DATE
  },
  task_frequency: {
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  task_note: {
    type: Sequelize.TEXT
  }
}, {
  timestamps: true
});

// Syncs with DB
Tasks.sync();

// Makes the Tasks Model available for other files (will also create a table)
module.exports = Tasks;
