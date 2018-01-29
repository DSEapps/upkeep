var json = require("../public/data/items.js")();

module.exports = function() {
    var allTasks = [];
    json.forEach(function (item) {
        allTasks = allTasks.concat(item.tasks)
    });
    return allTasks;
}

