var artistName = "cosmic tides";
var songTitle = "begin again";
var artistNameAndTrackSoundPlate = "cosmic tides - '" + songTitle  + "'";
var artistEmail = "cosmic.tides.lofi@gmail.com";
var artistSpotifyLink = "https://open.spotify.com/track/6QqEX6Y6auPOXEMEhKfHyu?si=cddb555229f64fd0";
var artistInstagram = "@cosmic.tides.lofi";

function triggerInputEvent(element) {
    var event = new Event('input', { bubbles: true });
    element.dispatchEvent(event);
}

function fillForm() {
    console.log("Attempting to fill the form");

    setTimeout(function() {
        var questions = document.querySelectorAll('div[role="heading"]');
        console.log("Found questions:", questions.length);

        questions.forEach(function(question) {
            var questionText = question.innerText.toLowerCase();
            console.log("Question text:", questionText);

            if (questionText.includes("artist name") || questionText.includes("artist") || questionText.includes(" name") ) {
                var divId = question.id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"][jsname="YPqjbf"]`);
                console.log("Found field for artist name", inputField);

                if (inputField) {
                    inputField.value = artistName;
                    triggerInputEvent(inputField);
                    console.log("Filled an arist name no link");
                }
            }

            if (questionText.includes("track title") || questionText.includes("track name") || questionText.includes("track")
            || questionText.includes("song")|| questionText.includes("song title")|| questionText.includes("song name") ) {
                var divId = question.id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"][jsname="YPqjbf"]`);
                console.log("Found field for track name", inputField);

                if (inputField) {
                    inputField.value = songTitle;
                    triggerInputEvent(inputField);
                    console.log("Filled an track name");
                }
            }

            if (questionText.includes("artistname - trackname")) {
                var divId = question.id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"][jsname="YPqjbf"]`);
                console.log("Found field for artist and song name link link:", inputField);

                if (inputField) {
                    inputField.value = artistNameAndTrackSoundPlate;
                    triggerInputEvent(inputField);
                    console.log("Filled an arist name and track field");
                }
            }


            //Spotify link logic
            if (questionText.includes("spotify") || questionText.includes("song link") || questionText.includes("link to track") ) {
                var divId = question.id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"][jsname="YPqjbf"]`);

                if(!inputField){
                    var inputField = document.querySelector(`textarea[aria-labelledby="${divId}"][jsname="YPqjbf"]`);
                }
                console.log("Found field for Spotify link:", inputField);

                if (inputField) {
                    inputField.value = artistSpotifyLink;
                    triggerInputEvent(inputField);
                    console.log("Filled a 'Spotify Track Link' field");
                }
            }

            //Comments and other things to add, add something positive about the song
            if (questionText.includes("comments") || questionText.includes("add") || questionText.includes("additional")){
                var divId = question.id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"][jsname="YPqjbf"]`);

                if(!inputField){
                    var inputField = document.querySelector(`textarea[aria-labelledby="${divId}"][jsname="YPqjbf"]`);
                }
                console.log("Found field for additional comments link:", inputField);

                if (inputField) {
                    inputField.value = 'Appreciate you listening! New music on the way! One Love! ';
                    triggerInputEvent(inputField);
                    console.log("Filled a 'comments and extras!");
                }
            }

            if (questionText.includes("instagram")) {
                var divId = question.id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"][jsname="YPqjbf"]`);
                console.log("Found field for instagram link:", inputField);

                if (inputField) {
                    inputField.value = artistInstagram;
                    triggerInputEvent(inputField);
                    console.log("Filled an instragram link!");
                }
            }

            if (questionText.includes("email") || questionText.includes("e-mail")) {
                var divId = question.id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"][jsname="YPqjbf"]`);
                if(!inputField){
                    var inputField = document.querySelector(`input[type='email'][aria-labelledby="${divId}"]`);

                }
                console.log("Found field for email link:", inputField);

                if (inputField) {
                    inputField.value = artistEmail;
                    triggerInputEvent(inputField);
                    console.log("Filled a email field");
                }
            }

            if (questionText.includes("email") || questionText.includes("e-mail")) {
                var divId = question.id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"][type="email"]`);

                if (!inputField) {
                    inputField = document.querySelector(`input[type="email"][aria-labelledby="${divId}"]`);
                }
                console.log("Found field for email link:", inputField);

                if (inputField) {
                    inputField.value = artistEmail;
                    triggerInputEvent(inputField);
                    console.log("Filled an email field");
                }
            }

            // Repeat similar logic for other fields like 'Instagram', 'Name', etc.

            //Soundplate logic 
            // let inputElement = document.querySelector(`input[name='input_1']`);
            // inputElement.value = "cosmic tides - 'begin again'";
            // console.log(inputElement);
    

        });
    }, 2000); // Delay of 3 seconds


    
}

//This is needed to trigger the changes for the drop down
function triggerChangeEvent(element) {
    var event = new Event('change', { bubbles: true });
    element.dispatchEvent(event);
}

function fillFormSoundPlate() {
    console.log("Attempting to fill the form on the new site");

    setTimeout(function() {
        //Artist name and track name formattted linkk
        var inputField = document.querySelector(`input[name='input_1']`);
        console.log("Found field with name 'input_1':", inputField);

        if (inputField) {
            inputField.value = artistNameAndTrackSoundPlate;
            triggerInputEvent(inputField);
            console.log("Artist name and track name filled out for 'input_1'");
        }

        //Spotify Link Input
        var inputField3 = document.querySelector(`input[name='input_3']`);
        if (inputField3){
            inputField3.value = artistSpotifyLink;
            triggerInputEvent(inputField3);
            console.log("Artist spotify link filled out for 'input_3'");
        }

        //Email Address input
        var inputField4 = document.querySelector(`input[name='input_4']`);

        if (inputField4){
            inputField4.value = artistEmail;
            triggerInputEvent(inputField4);
            console.log("Artist email filled out for 'input_4'");
        }

        var selectField = document.querySelector('select[name="input_5"]');
        console.log("Found dropdown with name 'input_5':", selectField);

        if (selectField) {
            selectField.value = 'Chillhop/Beats';
            triggerChangeEvent(selectField);
            console.log("Option set for 'input_5'");
        }

    }, 2000); // Delay of 2 seconds
}


if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', fillForm);
} else {
    fillForm();  // The DOMContentLoaded event has already fired, call the function directly
    fillFormSoundPlate();
}
