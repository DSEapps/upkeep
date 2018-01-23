module.exports = function(sequelize, DataTypes) {

// Creates a "Tasks" model that matches up with DB
  var Tasks = sequelize.define("tasks", {
    task_id:        { type: Sequelize.INTEGER, primaryKey: true },
    task_name:      { type: Sequelize.STRING },
    item_id:        { type: Sequelize.INTEGER },
    last_performed: { type: Sequelize.DATE },
    task_frequency: { type: Sequelize.INTEGER },
    user_id:        { type: Sequelize.INTEGER },
    task_note:      { type: Sequelize.TEXT }
  });

  Tasks.associate = function(models){
    Tasks.belongsTo(models.Items, {
      // onDelete: "cascade"
      foreignKey: {
        allowNull: false
      }
    });

    Tasks.belongsTo(models.Users, {
      // onDelete: "cascade"
      foreignKey: {
        allowNull: false
      }
    });

    Tasks.hasMany(models.Items, {
      // onDelete: "cascade"
    });

    Tasks.hasMany(models.Users, {
      // onDelete: "cascade"
    });

  };

  return Tasks;
};  

