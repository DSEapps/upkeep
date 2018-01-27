var filterArray = function(filters, array) {
    console.log("........................")
    console.log(filters);

    for (var i = array.length - 1; i >= 0; i--) {
        if (!filters.includes(array[i].item_name)) {
            array.splice(i, 1);
        }
    }
    return array;
}

module.exports = filterArray;