module.exports = function(sequelize, DataTypes) {

// Creates a "Tasks" model that matches up with DB
  var Tasks = sequelize.define("tasks", {
    task_id:        { type: DataTypes.INTEGER, primaryKey: true },
    task_name:      { type: DataTypes.STRING },
    // item_id:        { type: DataTypes.INTEGER },
    last_performed: { type: DataTypes.DATE },
    task_frequency: { type: DataTypes.INTEGER },
    // user_id:        { type: DataTypes.INTEGER },
    task_note:      { type: DataTypes.TEXT }
  });

  // Tasks.associate = function(models){
  //   Tasks.belongsTo(models.items, {
  //     // onDelete: "cascade"
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });

  //   Tasks.belongsTo(models.users, {
  //     // onDelete: "cascade"
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });

  //   Tasks.hasMany(models.items, {
  //     // onDelete: "cascade"
  //   });

  //   Tasks.hasMany(models.users, {
  //     // onDelete: "cascade"
  //   });

  // };

  return Tasks;
};  

