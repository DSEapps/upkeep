module.exports = function(sequelize, DataTypes) {

// Creates a "Users" model that matches up with DB
  var Users = sequelize.define("users", {
    user_id:        { type: DataTypes.INTEGER, primaryKey: true },
    google_id:      { type: DataTypes.STRING },
    user_email:     { type: DataTypes.STRING },
    date_created:   { type: DataTypes.DATE }
  });

  Users.associate = function(models){

    Users.belongsTo(models.items, {
      // onDelete: "cascade"
      foreignKey: {
        allowNull: false
      }
    });

    Users.belongsTo(models.tasks, {
      // onDelete: "cascade"
      foreignKey: {
        allowNull: false
      }
    });

    Users.hasMany(models.items, {
      // onDelete: "cascade"
    });

    Users.hasMany(models.tasks, {
      // onDelete: "cascade"
    });

  };

  return Users;
};  




