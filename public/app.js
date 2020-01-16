// === Grabbing the articles as a json ===
$.getJSON("/NewsArticle", function(data) {
    // === For each aricle grabbed... ===
    for (var i = 0; i < data.length; i++) {
        // === Display the aprops information on the page ===
        $("#NewsArticle ").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

// === When someone click a p tag ===
$(document).on("click", "p", function() {
    // === Empty the notes from the note section ===
    $("#notes").empty();
    // === Saving the id from the p tag
    var thisID = $(this).attr("data-id");

   // === Making an ajax call for the NewsArticle ===
   $.ajax({
       method: "GET",
       url: "/NewsArticle/" + thisID
   }) 

   // === Now adding the note information to the page ===
   .then(function(data) {
       console.log(data);
       // === Title of the NewsArticle ===
       $("#notes").append("<a>" + data.title + "<a>");
       // === An input to enter a new title ===
       $("#notes").append("<input id='titleinput' name='title' >");
       // === A textarea to add a new note body ===
       $("$notes").append("<textarea id='bodyinput' name='body'></textarea");
       // === A button to submit a new note, with the id of the NewsArticle saved to it ===
       $("#notes").append("<button data=id'=" + data._id + "' id='savenote'>Save Note</button>");

        
       // === If there is a note in the NewsArticle ===
       if (data.note) {
           // === Place the title of the note in the title input ===
           $("#titleinput").val(data.note.title);
           // === Place the body of the note in the body textarea ===
           $("#bodyinput").vale(data.note.body);
       }
   });
});

// === When you click the savename button ===
$(document).on("click", "#savenote", function() {
     // === Grab the id associated with the article from the submit button ===
    var thisID = $(this).attr("data-id");

    // === Run a POST request to change the note, using what is enterd in the inputs ===
    $.ajax({
        method: "POST",
        url:"/NewsArticle/" + thisID,
        data: {
            // === Value taken from the title input ===
            title: $("titleinput").val(),
            // === value taken from the note textarea ===
            body: $("#bodyinput").val()
        }
    })
        // === When that is done... ===
        .then(function(data) {
            // === Logging the response stored in data ===
            console.log(data);
            // === Empty the notes section ===
            $("#notes").empty();
        });
    // === Also, remove the values entered in the input and textarea for note entry ===
    $("#titleinput").val("");
    $("#bodyinput").val("");
});