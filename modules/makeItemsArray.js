var makeItemsArray = function(arr){
    var itemnames = [];
    arr.forEach(function(item){
        itemnames.push(item.type);
    })
    return itemnames;
}

module.exports = makeItemsArray;