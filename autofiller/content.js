console.log("Content script loaded");

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
                    inputField.value = 'cosmic tides';
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
                    inputField.value = 'begin again';
                    triggerInputEvent(inputField);
                    console.log("Filled an track name");
                }
            }

            if (questionText.includes("artistname - trackname")) {
                var divId = question.id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"][jsname="YPqjbf"]`);
                console.log("Found field for artist and song name link link:", inputField);

                if (inputField) {
                    inputField.value = 'cosmic tides - begin again';
                    triggerInputEvent(inputField);
                    console.log("Filled an arist name and track field");
                }
            }


            //Spotify link logic
            if (questionText.includes("spotify") || questionText.includes("song link") ) {
                var divId = question.id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"][jsname="YPqjbf"]`);

                if(!inputField){
                    var inputField = document.querySelector(`textarea[aria-labelledby="${divId}"][jsname="YPqjbf"]`);
                }
                console.log("Found field for Spotify link:", inputField);

                if (inputField) {
                    inputField.value = 'https://open.spotify.com/track/6QqEX6Y6auPOXEMEhKfHyu?si=cddb555229f64fd0';
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
                    inputField.value = '@cosmic.tides.lofi';
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
                    inputField.value = 'cosmic.tides.lofi@gmail.com';
                    triggerInputEvent(inputField);
                    console.log("Filled a email field");
                }
            }

            // Repeat similar logic for other fields like 'Instagram', 'Name', etc.
        });
    }, 3000); // Delay of 3 seconds
}

if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', fillForm);
} else {
    fillForm();  // The DOMContentLoaded event has already fired, call the function directly
}
