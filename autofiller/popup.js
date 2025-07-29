// Load saved data when popup opens
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(null, (data) => {
      document.getElementById('artistName').value = data.artistName || '';
      document.getElementById('songTitle').value = data.songTitle || '';
      document.getElementById('spotifyLink').value = data.spotifyLink || '';
      document.getElementById('email').value = data.email || '';
      document.getElementById('instagram').value = data.instagram || '';
      document.getElementById('comments').value = data.comments || '';
    });


    document.getElementById("exportCSV").addEventListener("click", () => {
        chrome.storage.sync.get("submissionLog", (data) => {
          const log = data.submissionLog || [];
      
          if (log.length === 0) {
            alert("No submissions to export.");
            return;
          }
      
          const headers = ["Artist", "Track", "Title", "URL", "Timestamp"];
          const rows = log.map(entry => [
            `"${entry.artist}"`,
            `"${entry.track}"`,
            `"${entry.title || ""}"`,
            `"${entry.url}"`,
            `"${new Date(entry.timestamp).toISOString()}"`
          ]);
      
          const csvContent =
            [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
      
          const blob = new Blob([csvContent], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
      
          const a = document.createElement("a");
          a.href = url;
          a.download = "submission_log.csv";
          a.click();
          URL.revokeObjectURL(url);
        });
      });
      



  });
  
  // Save new data
  document.getElementById('save').addEventListener('click', () => {
    const data = {
      artistName: document.getElementById('artistName').value,
      songTitle: document.getElementById('songTitle').value,
      spotifyLink: document.getElementById('spotifyLink').value,
      email: document.getElementById('email').value,
      instagram: document.getElementById('instagram').value,
      comments: document.getElementById('comments').value
    };
  
    chrome.storage.sync.set(data, () => {
      alert('Saved!');
    });
  });

  
  