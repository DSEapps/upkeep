var makeItemsArray = function(arr){
    var itemnames = [];
    arr.forEach(function(item){
        itemnames.push(item.type);
    })
    var sortedItemNames = itemnames.sort();
    return sortedItemNames;
}

module.exports = makeItemsArray;