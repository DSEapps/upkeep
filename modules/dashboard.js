var moment = require('moment');

var dashboard = function(req, res, db, callback){

    db.items.findAll({
        where: {
            userUserId: req.user.user_id
        },
        include: [db.tasks]
    }).then(function (items_db) {
        if (items_db.length === 0) {
            res.redirect("/setupitems")
        } else {
            var items = [];
            items_db.forEach(function (item) {
                items.push(item.dataValues);
            });

            //add time info and parent items to each task and then push to array
            var tasks = [];
            items.forEach(function (item) {
                item.tasks.forEach(function (rawtask) {
                    var task = rawtask.dataValues;
                    task.parentItem = item.type;
                    var lastDone = moment(task.last_performed);
                    var dueDate = moment(lastDone).add(task.task_frequency, 'months');
                    //give this in month day year format
                    task.dueDate = dueDate.format("YYYY-MM-DD");
                    task.dueDateFormatted = dueDate.format("MMMM Do, YYYY");
                    if (dueDate.isBefore(moment())) {
                        task.overdue = true;
                    } else if (dueDate.isBetween(moment(), moment().add(30, 'days'))) {
                        task.dueSoon = true;
                    }
                    tasks.push(task)
                })
            })

            //Sort by soonest first
            function compare(a, b) {
                aDueDate = moment(a.dueDate).unix();
                bDueDate = moment(b.dueDate).unix();
                if (aDueDate < bDueDate)
                    return -1;
                if (aDueDate > bDueDate)
                    return 1;
                return 0;
            }
            tasks.sort(compare);
            callback(tasks);
        }
    });


}

module.exports = dashboard;