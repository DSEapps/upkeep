var json = require("../public/data/items.json");
var arr = ["HVAC", "Hot water heater", "Siding"];

var itemsToSQL = function(){
	// console.log(json);
	// console.log(arr);

	// newItemObj contains an "item" as a db object
	// var newItemObj = {};

	// newItemArr is an array of newItemObj, which will be returned
	var newItemArr = [];

	// Loop thru each "item" in arr
	for (var i=0; i<arr.length; i++){

		// For each "item", 
		for(var j=0; j<json.length; j++){

			// evaluate if "item" in arr matches item in JSON data
			if(json[j].item_name===arr[i]){

				// If a match, then create new Item Object which contains an "item" as a db object
				var newItemObj = {
				    type: json[j].item_name,
				    manufacturer: "NULL",
				    model_number: "NULL",
				    date_installed: "1999-01-01 00:00:00",
				    serial_number: "NULL",
				    complex: json[j].complex,
				    items_note: "NULL",
				    userUserId: 1
				};

				// Push this new Item Ojbect into an array
				newItemArr.push(newItemObj);
			}

		}

	}

	return(newItemArr);

}

itemsToSQL();

module.exports = itemsToSQL;

