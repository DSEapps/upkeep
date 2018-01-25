
--  *************************************************************************************
--  sample-joins.sql - this file contains sample/modular SQL and Sequelize db queries
--  *************************************************************************************


-- * Left Join SQL (Returns all records from tasks that match records from user_id = 2)
-- * Results table: user_email, google_id, task_name, last_performed, task_note
SELECT users.user_email, users.google_id, tasks.task_name, tasks.last_performed, tasks.task_note
FROM tasks
LEFT JOIN users ON tasks.userUserId = users.user_id
WHERE users.user_id = 2;


-- * Left Join SQL (Returns records of users that match manufacturer = Honda)
-- * Results table: user_email, google_id
SELECT users.user_email, users.google_id
FROM users
LEFT JOIN items ON items.userUserId = users.user_id
WHERE items.manufacturer = "Honda";



-- // Dependencies
-- // =============================================================
-- // Requiring our Todo model
-- var db = require("../models");
-- // Routes
-- // =============================================================
-- module.exports = function(app) {

  // GET route for getting all of the tasks from a given user_id
  app.get("/api/tasks/:userId", function(req, res) {
    db.Tasks.findAll({
    	where: {
    		userUserId: req.params.userId
    	}
    	})
    .then(function(dbTasks) {
      res.json(dbTasks);
    });
  });


  // GET route for getting a specific tasks given a task_id
  app.get("/api/tasks/:taskId", function(req, res) {
    db.Tasks.findOne({
    	where: {
    		task_id: req.params.taskId
    	}
    	})
    .then(function(dbTasks) {
      res.json(dbTasks);
    });
  });


  // GET route for getting all of the items from a given user_id
  app.get("/api/items/:userId", function(req, res) {
    db.Items.findAll({
    	where: {
    		userUserId: req.params.userId
    	}
    	})
    .then(function(dbItems) {
      res.json(dbItems);
    });
  });


  // POST route for saving a new tasks (assuming user_id and item_id)
  app.post("/api/tasks", function(req, res) {
    db.Tasks.create({
      task_name: 	  req.body.task_name,
      last_performed: req.body.last_performed,
      task_frequency: req.body.task_frequency,
      task_note:      req.body.task_note,
      itemItemId:	  req.body.itemItemId,
      userUserId:	  req.body.userUserId
   })
    .then(function(dbTasks) {
      res.json(dbTasks);
    });
  });


  // POST route for saving a new item (assuming user_id)
  app.post("/api/items", function(req, res) {
    db.Items.create({
      type: 	  		req.body.type,
      manufacturer: 	req.body.manufacturer,
      model_number: 	req.body.model_number,
      date_installed:   req.body.date_installed,
      serial_number:	req.body.serial_number,
      items_note:	  	req.body.items_note,
      userUserId:		req.body.userUserId
   })
    .then(function(dbItems) {
      res.json(dbItems);
    });
  });



  // DELETE route for deleting items
  app.delete("/api/items/:itemId", function(req, res) {
    db.Items.destroy({
      where: {
        item_id: req.params.itemId
      }
    })
    .then(function(dbItems) {
      res.json(dbItems);
    });
  });

  // PUT route for updating tasks
  app.put("/api/tasks/:taskId", function(req, res) {
    db.Post.update(req.body,
      {
        where: {
          task_id: req.params.taskId
        }
      })
    .then(function(dbTasks) {
      res.json(dbTasks);
    });
  });


  // POST route for saving a new user (assuming google_id and email)
  app.post("/api/items", function(req, res) {
    db.Items.create({
      user_email: 	req.body.user_email,
      google_id: 	req.body.google_id,
   })
    .then(function(dbItems) {
      res.json(dbItems);
    });
  });



  -- 
  -- MODEL REFERENCE
  -- 

  var Users = sequelize.define("users", {
    user_id:        { type: DataTypes.INTEGER, primaryKey: true },
    user_email:     { type: DataTypes.STRING },
    google_id:      { type: DataTypes.STRING }
    createdAt:
    updatedAt:

  var Tasks = sequelize.define("tasks", {
    task_id:        { type: DataTypes.INTEGER, primaryKey: true },
    task_name:      { type: DataTypes.STRING },
    last_performed: { type: DataTypes.DATE },
    task_frequency: { type: DataTypes.INTEGER },
    task_note:      { type: DataTypes.TEXT }
    createdAt:
    updatedAt:
    itemItemId:	  
    userUserId:	  

  var Items = sequelize.define("items", {
    item_id:        { type: DataTypes.INTEGER, primaryKey: true },
    type:           { type: DataTypes.STRING },
    manufacturer:   { type: DataTypes.STRING },
    model_number:   { type: DataTypes.STRING },
    date_installed: { type: DataTypes.DATE },
    serial_number:  { type: DataTypes.STRING },
    items_note:     { type: DataTypes.TEXT }
    createdAt:
    updatedAt:
    userUserId:	  	



  -- 
  -- 
  -- 
  -- 
  -- 
  -- NEED TO BE MODIFIED
  -- 
  -- 
  -- 
  -- 


