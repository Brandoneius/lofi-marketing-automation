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
  