module.exports = function(sequelize, DataTypes) {

// Creates a "Items" model that matches up with DB
  var Items = sequelize.define("items", {
    item_id:        { type: Sequelize.INTEGER, primaryKey: true },
    type:           { type: Sequelize.STRING },
    manufacturer:   { type: Sequelize.STRING },
    model_number:   { type: Sequelize.STRING },
    date_installed: { type: Sequelize.DATE },
    serial_number:  { type: Sequelize.STRING },
    user_id:        { type: Sequelize.INTEGER },
    items_note:     { type: Sequelize.TEXT }
  });

  Items.associate = function(models){
    Items.hasMany(models.Users, {
      // onDelete: "cascade"
    });

    Items.hasMany(models.Tasks, {
      // onDelete: "cascade"
    });

  };

  return Items;
};  
