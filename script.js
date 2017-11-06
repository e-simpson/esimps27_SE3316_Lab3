/*global $*/
var port = ':8081'
var site = 'https://esimps27-lab-3-esimps27.c9users.io'

$(document).ready(function() {

    // process ajax post message to mongodb on server
    function postMessage(inputID, courseID) {
        showLoading()
        $.ajax({
            type: 'POST',
            data: { "text": $(inputID).val(), "courseID": courseID, "time": $.now() },
            url: site + port + '/api/tweets',
            success: function() {
                $(inputID).val('');
                $(inputID).keyup();
                getAllMessages();
            },
            error: function(r, e) { alert(e + ", r:" + r); }
        });
    }

    // process ajax get
    function getAllMessages() {
        showLoading();
        $.ajax({
            url: site + port + '/api/tweets',
            type: 'GET',
            error: function(r, e) { alert(e + ", r:" + r); },
            success: function(data) { populateMessageLists(data); }
        })
    };
    getAllMessages(); setInterval(getAllMessages, 5000);





    // create new message element with styling
    function newMessageElement(listID, message) {
        var d = new Date(message.time);
        $(listID).append(
            '<li style = "list-style-type: none; margin: 10px 20px 10px 20px;">' +
            '<b style= " padding: 5px 13px 5px 13px;  border-radius: 3px; box-shadow: 0 2px 3px 0 rgba(0,0,0,0); background: #ffab51; font-size: 0.7em; ">' +
            message.text +
            '</b>' +
            '<i style= "padding: 5px 13px 5px 13px; color: #c1c1c1; font-size: 0.7em; ">' +
            d.toLocaleTimeString() + ", " + d.toLocaleDateString() +
            '</i>' +
            '</li>'
        )
    }

    // populate the ui with messages
    function populateMessageLists(messages) {
        $("#courseList1").empty(); var course1count = 0;
        $("#courseList2").empty(); var course2count = 0;

        $.each(messages.reverse(), function(i, item) {
            if (messages[i].courseID == "SE 3316" && messages[i].text != null && messages[i].time != null) {
                if (course1count <= 20) {
                    newMessageElement("#courseList1", messages[i]);
                    course1count += 1;
                }
            }
            if (messages[i].courseID == "SE 3313" && messages[i].text != null && messages[i].time != null) {
                if (course2count <= 20) {
                    newMessageElement("#courseList2", messages[i]);
                    course2count += 1;
                }
            }
        });

        removeLoading();
    };
    
    //check and update the character counts
    function checkCharacterCount(inputID, counterID){
        var text = $(inputID).val()
        var count = text.length; if (text == "") { count = 0;}
        $(counterID).text(count + "/200");
    }



    // set up submit buttons to post when enter or submit button
    $("#enter1").click(function() { postMessage('#input1', "SE 3316"); });
    $("#input1").keyup(function(e) {
        checkCharacterCount("#input1", "#charCount1");
        if (e.which == 13) { $("#enter1").click(); } 
    });
    
    // set character counting
    // $("#input1").keydown(function(e) {  });
    
    // set up submit buttons to post when enter or submit button
    $("#enter2").click(function() { postMessage('#input2', "SE 3313"); });
    $("#input2").keyup(function(e) {
        checkCharacterCount("#input2", "#charCount2");
        if (e.which == 13) { ("#enter2").click();} 
    });




    // show loading spinner
    function showLoading() {
        if (document.getElementById("divLoadingFrame") != null) {
            return;
        }
        var style = document.createElement("style");
        style.id = "styleLoadingWindow";
        style.innerHTML = `
        .loading-frame {
            position: fixed;
            background-color: rgba(0, 0, 0, 0);
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 4;
        }

        .loading-track {
            height: 50px;
            display: inline-block;
            position: absolute;
            top: calc(9% - 55px);
            left: 80px;
        }

        .loading-dot {
            height: 6px;
            width: 6px;
            background-color: black;
            border-radius: 100%;
            opacity: 1;
        }

        .loading-dot-animated {
            animation-name: loading-dot-animated;
            animation-direction: alternate;
            animation-duration: .10s;
            animation-iteration-count: infinite;
        }

        @keyframes loading-dot-animated {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }
    `

        document.body.appendChild(style);
        var frame = document.createElement("div");
        frame.id = "divLoadingFrame";
        frame.classList.add("loading-frame");
        for (var i = 0; i < 8; i++) {
            var track = document.createElement("div");
            track.classList.add("loading-track");
            var dot = document.createElement("div");
            dot.classList.add("loading-dot");
            track.style.transform = "rotate(" + String(i * 45) + "deg)";
            track.appendChild(dot);
            frame.appendChild(track);
        }
        document.body.appendChild(frame);
        var wait = 0;
        var dots = document.getElementsByClassName("loading-dot");
        for (var i = 0; i < dots.length; i++) {
            window.setTimeout(function(dot) {
                dot.classList.add("loading-dot-animated");
            }, wait, dots[i]);
            wait += 20;
        }
    };

    // remove loading spinner
    function removeLoading() {
        document.body.removeChild(document.getElementById("divLoadingFrame"));
        document.body.removeChild(document.getElementById("styleLoadingWindow"));
    };

});
