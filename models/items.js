module.exports = function (sequelize, DataTypes) {

  // Creates a "Items" model that matches up with DB
  var Items = sequelize.define("items", {
    item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING },
    manufacturer: { type: DataTypes.STRING },
    model_number: { type: DataTypes.STRING },
    date_installed: { type: DataTypes.DATE },
    serial_number: { type: DataTypes.STRING },
    complex: { type: DataTypes.BOOLEAN, allowNull: false },
    items_note: { type: DataTypes.TEXT }
  });


  Items.associate = function (models) {    
    Items.hasMany(models.tasks, {
      foreignKey: {
        allowNull: false
      }
    });
  };


  return Items;
};



