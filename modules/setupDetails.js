var setupDetails = function (req, db, selector, callback) {

    var allItems = require('../public/data/items.js')();

    //IF SELECTOR, add extra param to the query

    db.items.findAll({
        where: {
            userUserId: req.user.user_id
        },
        include: [db.tasks]
    }).then(function (items_db) {
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
                        tasks.push(task.dataValues);
                    })
                    item.tasks = tasks
                }
            })
            callback(items);
        }//END ELSE
    })//END THEN
}



module.exports = setupDetails;