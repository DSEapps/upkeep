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
		console.log("This is loop iteration #: " + i + "   This is item type: " + arr[i]);



		// For each match, store 
		for(var j=0; j<json.length; j++){

			if(json[j].item_name===arr[i]){
				console.log("This is a match: " + json[j].item_name);

				// Create new Item Object
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



		console.log("\n");

	}

	console.log(newItemArr);
	return(newItemArr);

}

itemsToSQL();

module.exports = itemsToSQL;

// var a=[], b={};
// a.push(b);    
// a[0] === b;

// NEED TO BUILD THIS OBJECT AND PASS IT BACK
// var newItemObj = {
//     type: "House",
//     manufacturer: "NULL",
//     model_number: "NULL",
//     date_installed: "2013-01-01 00:00:00",
//     serial_number: "NULL",
//     complex: 0,
//     items_note: "Lorem ipsum dolor sit amet.",
//     userUserId: 1
// };


// var obj = {
//    "a": "test1",
//    "b": "test2"
// };
// Object.keys(obj).forEach(function(key) {
//   if (obj[key] == 'test1') {
//     alert('exists');
//   }
// });


// var obj = json[j];
// Object.keys(obj).forEach(function(key){
// 	if (obj[key] == arr[i]){

// 	}
// })

