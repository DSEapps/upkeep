module.exports = function(sequelize, DataTypes) {

// Creates a "Items" model that matches up with DB
  var Items = sequelize.define("items", {
    item_id:        { type: DataTypes.INTEGER, primaryKey: true },
    type:           { type: DataTypes.STRING },
    manufacturer:   { type: DataTypes.STRING },
    model_number:   { type: DataTypes.STRING },
    date_installed: { type: DataTypes.DATE },
    serial_number:  { type: DataTypes.STRING },
    user_id:        { type: DataTypes.INTEGER },
    items_note:     { type: DataTypes.TEXT }
  });

  Items.associate = function(models){

    Items.belongsTo(models.users, {
      // onDelete: "cascade"
      foreignKey: {
        allowNull: false
      }
    });


    Items.hasMany(models.users, {
      // onDelete: "cascade"
    });

    Items.hasMany(models.tasks, {
      // onDelete: "cascade"
    });

  };

  return Items;
};  
