$(document).ready(function() {
    var searchArray = ["The Spice Girls", "Rugrats", "Saved By the Bell", "MC Hammer", "Lisa Frank"];        
    function displaySearchInfo() {
        var search = $(this).attr("data-name"); //the search value of the text box
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=1ZrYC1a76Ua3L9J4bUzSAFDP22ab1Ubq&limit=10"; //limit of the images is 10
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            for(var x = 0; x < response.data.length; x++){ //loops to show amount of data sent by the API
                $("#gifsGoHere").prepend(
                    "<div>" + response.data[x].rating + "</div>" +
                    "<img class='gif' src='" + response.data[x].images.fixed_height.url + "' data-animate='" + response.data[x].images.fixed_height.url + "' data-still='" + response.data[x].images.fixed_height_still.url + "' data-state='animate'>"
                );
            }
            $(".gif").on("click", function(){
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Else set src to the data-still value
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    };

    function renderButtons() {

        $("#buttonsGoHere").empty();
        // Loops through the array of 90s gifs
        for (var i = 0; i < searchArray.length; i++) {

            // Then dynamicaly generates buttons for each gif in the array
            var a = $("<button>");
            a.addClass("search");
            // Added a data-attribute
            a.attr("data-name", searchArray[i]);
            // Provided the initial button text
            a.text(searchArray[i]);
            // Added the button to the buttonsGoHere div
            $("#buttonsGoHere").append(a);
        }
    }

    $(".submitButton").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var gifSearch = $("#gifInput").val().trim();

        // The gif from the textbox is then added to the array
        searchArray.push(gifSearch);

        // Calling renderButtons which handles the processing of our searchArray array
        renderButtons();
    });

    // Adding click event listeners to all elements with a class of "search"
    $(document).unbind().on("click", ".search", displaySearchInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

});