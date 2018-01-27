// btn-itemsToTrack
$(document).ready(function () {

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





});//End of document ready