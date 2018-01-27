var moment = require("moment")
var taskToItems = function (base, source) {

    var dataValues = [];
    base.forEach(function(item){        
        dataValues.push(item.dataValues);
    });

    dataValues.forEach(function (item) {  
        item.date_installed = moment(item.date_installed).format("YYYY-MM-DD");        

        source.forEach(function (sourceItem) {
            if (item.type === sourceItem.item_name) {
                item.tasks = sourceItem.tasks;
            }
        })
    })

    return dataValues;
}

module.exports = taskToItems;