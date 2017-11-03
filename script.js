/*global $*/

$(document).ready(function() {

    // get tweets here
    function loadMessageLists() {
        //some code
    }


    // set up submit buttons to post
    $("#enter1").click(function() {
        var data = {};
        data.text = $('#input1').val();
        data.courseID = "1";

        $.ajax({
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            url: 'https://esimps27-lab-3-esimps27.c9users.io:8000/api/tweets',
            success: loadMessageLists,
        });
        
        $.get( "https://esimps27-lab-3-esimps27.c9users.io:8000/api/tweets", function( data ) {
            $( ".result" ).html( data );
            alert( "Load was performed." );
        });

        $('#input1').val('')
    });

    $("#enter2").click(function() {

    });


    $("#input1").keyup(function(e) { if (e.which == 13) { $("#enter1").click() } }); // set enter key to send input 1
    $("#input2").keyup(function(e) { if (e.which == 13) { $("#enter2").click() } }); // set enter key to send input 2


});
