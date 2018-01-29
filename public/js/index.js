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
        var profile = { items: [], tasks: [] }
        var tasksNoTimes = "";

        function Item(id, brand, serial, notes) {
            this.item_id = id;
            this.manufacturer = brand;
            this.serial_number = serial;
            this.items_note = notes;
        }

        $(".item-wrapper").map(function () {
            var id = $(this).attr("data-id");
            var brand = $(this).find("input[name='brand']").val();
            var serial = $(this).find("input[name='serial']").val();
            var note = $(this).find("textarea[name='notes']").val();
            var newitem = new Item(id, brand, serial, note);
            profile.items.push(newitem);
        })

        function Task(id, date) {
            this.task_id = id;
            this.last_performed = date;
        }

        $(".item-tasks-block").map(function () {
            var id = $(this).attr("data-taskid");
            var time = $(this).find("input[name='last-performed']").val();
            if (!time) {
                tasksNoTimes += $(this).find(".task-title").text() + "\n";
            }
            var newtask = new Task(id, time);
            profile.tasks.push(newtask);
        })

        if (tasksNoTimes.length > 0) {
            alert("Please enter a last completed date for the following tasks:\n" + tasksNoTimes)
            return;
        }

        $.ajax("/editdetails", {
            type: "POST",
            data: JSON.stringify(profile),
            contentType: "application/json"
        }).done(function (url) {
            // api function returns /dashboard
            window.location.replace(url);
        }
            );
    })//End of Setupdetails

    //DASHBOARD

    // Navigate to setupitems
    $("#btn-editAllitems").on("click", function (event) {
        window.location.replace("/setupitems");
    });









});//End of document ready