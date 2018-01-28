var moment = require('moment');
var setupDetails = function (req, res, db, selector, callback) {

    var allItems = require('../public/data/items.js')();
    
    var query = {
        where: {
            userUserId: req.user.user_id
        },
        include: [db.tasks]
    }

    if (selector) {
        query.where.item_id = selector
    }    

    db.items.findAll(query).then(function (items_db) {
        if (items_db.length === 0) {
            res.redirect("/setupitems")
        } else {
            //Clean up items values
            var items = [];
            items_db.forEach(function (item) {
                items.push(item.dataValues);
            });

            //Clean up task values + 
            items.forEach(function (item) {
                var tasks = [];
                //Check if item already has tasks -> then build or clean
                if (item.tasks.length === 0) {
                    allItems.forEach(function (allItem) {
                        if (allItem.item_name === item.type) {
                            item.tasks = allItem.tasks;
                        }
                    })
                } else {
                    item.tasks.forEach(function (task) {
                        var newTask = task.dataValues;
                        newTask.last_performed = moment(newTask.last_performed).format("YYYY-MM-DD");
                        tasks.push(newTask);
                    })
                    item.tasks = tasks
                }
            })

            console.log(JSON.stringify(items));
            callback(items);
        }//END ELSE
    })//END THEN
}



module.exports = setupDetails;