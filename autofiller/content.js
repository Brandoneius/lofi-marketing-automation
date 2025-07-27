chrome.storage.sync.get(null, (autofillData) => {
    if (!autofillData || !autofillData.artistName) {
      console.warn("No autofill data found. Fill out the popup first.");
      return;
    }
  
    const artistName = autofillData.artistName || "";
    const songTitle = autofillData.songTitle || "";
    const artistNameAndTrackSoundPlate = `${artistName} - '${songTitle}'`;
    const artistEmail = autofillData.email || "";
    const artistSpotifyLink = autofillData.spotifyLink || "";
    const artistInstagram = autofillData.instagram || "";
    const artistComments = autofillData.comments || "Appreciate you listening! New music on the way! One Love! ";
  
    function triggerInputEvent(element) {
      const event = new Event('input', { bubbles: true });
      element.dispatchEvent(event);
    }
  
    function triggerChangeEvent(element) {
      const event = new Event('change', { bubbles: true });
      element.dispatchEvent(event);
    }
  
    function fillForm() {
        console.log("Attempting to fill the form");
      
        setTimeout(() => {
          const questions = document.querySelectorAll('div[role="heading"]');
          console.log("Found questions:", questions.length);
      
          questions.forEach((question) => {
            const questionText = question.innerText.toLowerCase();
      
            // Flexible autofill that tries multiple strategies
            const matchAndFill = (keywords, value) => {
                if (keywords.some(k => questionText.includes(k))) {
                  const container = question.closest('div');
                  const inputContainer = container?.parentElement?.parentElement?.nextElementSibling;
              
                  let inputField =
                    inputContainer?.querySelector('input') ||
                    inputContainer?.querySelector('textarea');
              
                  if (inputField) {
                    inputField.value = value;
                    triggerInputEvent(inputField);
                    console.log(`✅ Filled '${questionText}' with '${value}'`);
                  } else {
                    console.warn(`❌ Couldn't find input near '${questionText}'`);
                  }
                }
              };
              
              
              
      
            matchAndFill(["artist name", "artist", " name"], artistName);
            matchAndFill(["track title", "track name", "track", "song", "song title", "song name"], songTitle);
            matchAndFill(["artistname - trackname"], artistNameAndTrackSoundPlate);
            matchAndFill(["spotify", "song link", "link to track"], artistSpotifyLink);
            matchAndFill(["comments", "add", "additional"], artistComments);
            matchAndFill(["instagram"], artistInstagram);
            matchAndFill(["email", "e-mail"], artistEmail);
          });
        }, 2000);

        // After the questions.forEach block:
        const fallbackEmailField = document.querySelector('input[type="email"]');
        if (fallbackEmailField) {
        fallbackEmailField.value = artistEmail;
        triggerInputEvent(fallbackEmailField);
        console.log("✅ Fallback filled email field directly");
        }
        
      }
      
  
    function fillFormSoundPlate() {
      console.log("Attempting to fill the form on the new site");
  
      setTimeout(() => {
        let input1 = document.querySelector(`input[name='input_1']`);
        if (input1) {
          input1.value = artistNameAndTrackSoundPlate;
          triggerInputEvent(input1);
          console.log("Filled 'input_1'");
        }
  
        let input3 = document.querySelector(`input[name='input_3']`);
        if (input3) {
          input3.value = artistSpotifyLink;
          triggerInputEvent(input3);
          console.log("Filled 'input_3'");
        }
  
        let input4 = document.querySelector(`input[name='input_4']`);
        if (input4) {
          input4.value = artistEmail;
          triggerInputEvent(input4);
          console.log("Filled 'input_4'");
        }
  
        let select5 = document.querySelector('select[name="input_5"]');
        if (select5) {
          select5.value = 'Chillhop/Beats';
          triggerChangeEvent(select5);
          console.log("Selected 'Chillhop/Beats'");
        }
      }, 2000);
    }
  
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        fillForm();
        fillFormSoundPlate();
      });
    } else {
      fillForm();
      fillFormSoundPlate();
    }
  });
  