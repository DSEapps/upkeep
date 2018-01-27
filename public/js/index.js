// btn-itemsToTrack
$(document).ready(function () {

    //Setupitems submit listener
    $("#btn-itemsToTrack").on("click", function (event) {
        var items = [];
        $("input:checked").map(function () {
            items.push(this.name);
        })

        var data = {data:items}


        $.ajax("/edititems", {
            type: "POST",
            data: JSON.stringify(items),
            contentType:"application/json"
        }).done(
            console.log("done")
            )
            .fail(console.log("fail"));
    })//End of Setupitems





});//End of document ready