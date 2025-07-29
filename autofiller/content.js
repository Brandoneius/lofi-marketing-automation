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
  
    let artistFieldWasFilled = false;
  
    function triggerInputEvent(element) {
      const event = new Event('input', { bubbles: true });
      element.dispatchEvent(event);
    }
  
    function triggerChangeEvent(element) {
      const event = new Event('change', { bubbles: true });
      element.dispatchEvent(event);
    }
  
    function logSubmission() {
      if (!artistFieldWasFilled) {
        console.log("⏭️ Artist field was not filled — skipping log.");
        return;
      }
  
      const currentUrl = window.location.href;
      const heading = document.querySelector("div[role='heading']")?.innerText || document.title;
  
      chrome.storage.sync.get({ submissionLog: [] }, (data) => {
        const log = data.submissionLog;
        const alreadyLogged = log.some(
          (entry) =>
            entry.url === currentUrl &&
            entry.artist === artistName &&
            entry.track === songTitle
        );
  
        if (!alreadyLogged) {
          log.push({
            url: currentUrl,
            timestamp: new Date().toISOString(),
            artist: artistName,
            track: songTitle,
            heading
          });
  
          chrome.storage.sync.set({ submissionLog: log }, () => {
            console.log("✅ Playlist submission logged:", currentUrl);
          });
        } else {
          console.log("⚠️ Already submitted — skipping log.");
        }
      });
    }
  
    function fillForm() {
      console.log("Attempting to fill the form");
  
      setTimeout(() => {
        const questions = document.querySelectorAll('div[role="heading"]');
        console.log("Found questions:", questions.length);
  
        questions.forEach((question) => {
          const questionText = question.innerText.toLowerCase();
  
          const matchAndFill = (keywords, value, markArtist = false) => {
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
                if (markArtist) artistFieldWasFilled = true;
              } else {
                console.warn(`❌ Couldn't find input near '${questionText}'`);
              }
            }
          };
  
          matchAndFill(["artist name", "artist", " name"], artistName, true);
          matchAndFill(["track title", "track name", "track", "song", "song title", "song name"], songTitle);
          matchAndFill(["artistname - trackname"], artistNameAndTrackSoundPlate);
          matchAndFill(["spotify", "song link", "link to track"], artistSpotifyLink);
          matchAndFill(["comments", "add", "additional"], artistComments);
          matchAndFill(["instagram"], artistInstagram);
          matchAndFill(["email", "e-mail"], artistEmail);
        });
  
        const fallbackEmailField = document.querySelector('input[type="email"]');
        if (fallbackEmailField) {
          fallbackEmailField.value = artistEmail;
          triggerInputEvent(fallbackEmailField);
          console.log("✅ Fallback filled email field directly");
        }
  
        logSubmission();
      }, 2000);
    }
  
    function fillFormSoundPlate() {
      console.log("Attempting to fill the form on the new site");
  
      setTimeout(() => {
        let didSomething = false;
  
        let input1 = document.querySelector(`input[name='input_1']`);
        if (input1) {
          input1.value = artistNameAndTrackSoundPlate;
          triggerInputEvent(input1);
          console.log("Filled 'input_1'");
          didSomething = true;
          artistFieldWasFilled = true;
        }
  
        let input3 = document.querySelector(`input[name='input_3']`);
        if (input3) {
          input3.value = artistSpotifyLink;
          triggerInputEvent(input3);
          console.log("Filled 'input_3'");
          didSomething = true;
        }
  
        let input4 = document.querySelector(`input[name='input_4']`);
        if (input4) {
          input4.value = artistEmail;
          triggerInputEvent(input4);
          console.log("Filled 'input_4'");
          didSomething = true;
        }
  
        let select5 = document.querySelector('select[name="input_5"]');
        if (select5) {
          select5.value = 'Chillhop/Beats';
          triggerChangeEvent(select5);
          console.log("Selected 'Chillhop/Beats'");
          didSomething = true;
        }
  
        if (didSomething) logSubmission();
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
  