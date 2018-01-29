module.exports = function(sequelize, DataTypes) {

// Creates a "Tasks" model that matches up with DB
  var Tasks = sequelize.define("tasks", {
    task_id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    task_name:      { type: DataTypes.STRING },
    last_performed: { type: DataTypes.DATE },
    task_frequency: { type: DataTypes.INTEGER },
    task_note:      { type: DataTypes.TEXT }
  });

  return Tasks;
};  

