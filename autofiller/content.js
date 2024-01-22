console.log("Content script loaded");

function triggerInputEvent(element) {
    // Create and dispatch an 'input' event to mimic user interaction
    var event = new Event('input', { bubbles: true });
    element.dispatchEvent(event);
}

function fillForm() {
    console.log("Attempting to fill the form");

    setTimeout(function() {
        var labels = document.querySelectorAll('span');
        console.log("Found labels:", labels.length);

        labels.forEach(function(label) {
            //console.log(label);

            if (label.textContent.toLowerCase().includes("spotify")) {
                var divId = label.closest('div[role="heading"]').id;
                var textArea = document.querySelector(`textarea[aria-labelledby="${divId}"]`);
                if (textArea) {
                    textArea.value = 'https://open.spotify.com/track/6QqEX6Y6auPOXEMEhKfHyu?si=3777e750828643f6';
                    triggerInputEvent(textArea);
                    console.log("Filled a 'Spotify Track Link' textarea");
                }
            }

            if (label.textContent.toLowerCase().includes("instagram")) {
                var divId = label.closest('div[role="heading"]').id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"]`) || 
                                 document.querySelector(`textarea[aria-labelledby="${divId}"]`);
                if (inputField) {
                    inputField.value = '@cosmic.tides.lofi';
                    triggerInputEvent(inputField);
                    console.log("Filled an 'Instagram' field");
                } else {
                    console.log("No Instagram field found");
                }
            }

            if (label.textContent.toLowerCase().includes("name")) {
                var divId = label.closest('div[role="heading"]').id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"]`) || 
                                 document.querySelector(`textarea[aria-labelledby="${divId}"]`);
                if (inputField) {
                    inputField.value = 'Cosmic Tides';
                    triggerInputEvent(inputField);
                    console.log("Filled a 'Name' field");
                } else {
                    console.log("No 'Name' field found");
                }
            }

            if (label.textContent.toLowerCase().includes("comments")) {
                var divId = label.closest('div[role="heading"]').id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"]`) || 
                                 document.querySelector(`textarea[aria-labelledby="${divId}"]`);
                if (inputField) {
                    inputField.value = 'Thanks for listening to my music!';
                    triggerInputEvent(inputField);
                    console.log("Filled a 'Comments' field");
                } else {
                    console.log("No 'Comments' field found");
                }
            }

            if (label.textContent.toLowerCase().includes("email")) {
                var divId = label.closest('div[role="heading"]').id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"]`) || 
                                 document.querySelector(`textarea[aria-labelledby="${divId}"]`) ||
                                 document.querySelector(`email[aria-labelledby="${divId}"]`) ;
                console.log(inputField)
                if (inputField) {
                    inputField.value = 'cosmic.tides.lofi@gmail.com';
                    triggerInputEvent(inputField);
                    console.log("Filled an 'Email' field");
                } else {
                    console.log("No 'Email' field found");
                }
            }
        });
    }, 3000); // Delay of 3 seconds
}

if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', fillForm);
} else {
    fillForm();  // The DOMContentLoaded event has already fired, call the function directly
}
