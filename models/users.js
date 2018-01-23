module.exports = function(sequelize, DataTypes) {

// Creates a "Users" model that matches up with DB
  var Users = sequelize.define("users", {
    user_id:        { type: Sequelize.INTEGER, primaryKey: true },
    google_id:      { type: Sequelize.STRING },
    user_email:     { type: Sequelize.STRING },
    date_created:   { type: Sequelize.DATE }
  });

  Users.associate = function(models){

    Users.belongsTo(models.Items, {
      // onDelete: "cascade"
      foreignKey: {
        allowNull: false
      }
    });

    Users.belongsTo(models.Tasks, {
      // onDelete: "cascade"
      foreignKey: {
        allowNull: false
      }
    });

    Users.hasMany(models.Items, {
      // onDelete: "cascade"
    });

    Items.hasMany(models.Tasks, {
      // onDelete: "cascade"
    });

  };

  return Items;
};  




