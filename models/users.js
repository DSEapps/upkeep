module.exports = function(sequelize, DataTypes) {

// Creates a "Users" model that matches up with DB
  var Users = sequelize.define("users", {
    user_id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_email:     { type: DataTypes.STRING },
    google_id:      { type: DataTypes.STRING }
    // date_created:   { type: DataTypes.DATE }
  });


  Users.associate = function(models) {
    
    Users.hasMany(models.items, {
      foreignKey: {
        allowNull: false
      }
    });

    Users.hasMany(models.tasks, {
      foreignKey: {
        allowNull: false
      }
    });

  };

  return Users;
};  

