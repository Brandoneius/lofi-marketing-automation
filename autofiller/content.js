console.log("Content script loaded");
function fillForm() {
    console.log("Attempting to fill the form");

    setTimeout(function() {
        var allInputs = document.querySelectorAll('input, textarea, select');
        console.log("Total fields found:", allInputs.length);

        //Debug!!!!
        // allInputs.forEach(field => {
        //     console.log("Field found:", field.outerHTML);  // Debugging line to see each field

        // });
    
        var labels = document.querySelectorAll('span');
        console.log("Found labels:", labels.length);


    
        labels.forEach(function(label) {
            console.log(label);
            if (label.textContent.includes("Spotify Track Link")) {
                var divId = label.closest('div[role="heading"]').id;
                var textArea = document.querySelector(`textarea[aria-labelledby="${divId}"]`);
                if (textArea) {
                    textArea.value = 'https://open.spotify.com/track/6QqEX6Y6auPOXEMEhKfHyu?si=3777e750828643f6';
                    console.log("Filled a 'Spotify Track Link' textarea");
                }
            }

            if (label.textContent.includes("instagram") ||  label.textContent.includes("Instagram")) {
                var divId = label.closest('div[role="heading"]').id;
                var textArea = document.querySelector(`textarea[aria-labelledby="${divId}"]`);
                if (textArea) {
                    textArea.value = '@cosmic.tides.lofi';
                    console.log("Filled a 'instagram' textarea");
                }
            } else {
                console.log("No instagram link found");
            }

            if (label.textContent.toLowerCase().includes("instagram")) {
                var divId = label.closest('div[role="heading"]').id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"]`); // Assuming it's an input field
                if (inputField) {
                    inputField.value = '@cosmic.tides.lofi';
                    console.log("Filled an 'Instagram' field");
                } else {
                    console.log("No Instagram field found");
                }
            }


            // Name field
            if (label.textContent.toLowerCase().includes("name")) {
                var divId = label.closest('div[role="heading"]').id;
                // Try to find an input field first
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"]`);
                
                // If an input field isn't found, try to find a textarea
                if (!inputField) {
                    inputField = document.querySelector(`textarea[aria-labelledby="${divId}"]`);
                }

                if (inputField) {
                    inputField.value = 'Cosmic Tides';
                    console.log("Filled a 'Name' field");
                } else {
                    console.log("No 'Name' field found");
                }
            }

            // Name field
            if (label.textContent.toLowerCase().includes("comments")) {
                var divId = label.closest('div[role="heading"]').id;
                // Try to find an input field first
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"]`);
                
                // If an input field isn't found, try to find a textarea
                if (!inputField) {
                    inputField = document.querySelector(`textarea[aria-labelledby="${divId}"]`);
                }

                if (inputField) {
                    inputField.value = 'Thanks for listening to my music! ';
                    console.log("Filled a 'Name' field");
                } else {
                    console.log("No 'Name' field found");
                }
            }
            //Name field 
            if (label.textContent.toLowerCase().includes("name")) {
                var divId = label.closest('div[role="heading"]').id;
                var inputField = document.querySelector(`input[aria-labelledby="${divId}"]`); // Assuming it's an input field
                if (inputField) {
                    inputField.value = 'Cosmic Tides';
                    console.log("Filled an 'Instagram' field");
                } else {
                    console.log("No Instagram field found");
                }
            }
            if (label.textContent.includes("email")) {
                var divId = label.closest('div[role="heading"]').id;
                var textArea = document.querySelector(`textarea[aria-labelledby="${divId}"]`);
                if (textArea) {
                    textArea.value = 'cosmic.tides.lofi@gmail.com';
                    console.log("Filled a 'instagram' textarea");
                }
            }
        });

    }, 3000); // Delay of 3 seconds
}

if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', fillForm);
} else {
    // The DOMContentLoaded event has already fired, call the function directly
    fillForm();
}
