module.exports = function(sequelize, DataTypes) {

// Creates a "Users" model that matches up with DB
  var Users = sequelize.define("users", {
    user_id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_email:     { type: DataTypes.STRING },
    google_id:      { type: DataTypes.STRING }
    // date_created:   { type: DataTypes.DATE }
  });


  Users.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
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

  // Users.associate = function(models){

  //   Users.belongsTo(models.items, {
  //     // onDelete: "cascade"
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });

  //   Users.belongsTo(models.tasks, {
  //     // onDelete: "cascade"
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });

  //   Users.hasMany(models.items, {
  //     // onDelete: "cascade"
  //   });

  //   Users.hasMany(models.tasks, {
  //     // onDelete: "cascade"
  //   });

  // };

  return Users;
};  

