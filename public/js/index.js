// btn-itemsToTrack
$(document).ready(function () {

    // SETUPITEMS
    //Setupitems submit listener
    $("#btn-itemsToTrack").on("click", function (event) {
        var items = [];
        $("input:checked").map(function () {
            items.push(this.name);
        })
        $.ajax("/edititems", {
            type: "POST",
            data: JSON.stringify(items),
            contentType: "application/json"
        }).done(function (url) {
            window.location.replace(url);
        }
            );
    })//End of Setupitems

    // SETUPDETAILS
    // Setupdetails event listener
    $("#btn-itemsDetails").on("click", function (event) {
        // grab values from each item
        // item-type
        // item-manufacturer
        // item-serial
        // item-note
        // task-name
        // last-performed


        $.ajax("/editdetails", {
            type: "POST",
            data: JSON.stringify(items),
            contentType: "application/json"
        }).done(function (url) {
            // api function returns /dashboard
            window.location.replace(url);
            }
        );
    })

    //DASHBOARD

    // Navigate to setupitems
    $("#btn-editAllitems").on("click", function (event) {
         window.location.replace("/setupitems");
    });



    //End of Setupdetails





});//End of document ready