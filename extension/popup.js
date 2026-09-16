document.addEventListener('DOMContentLoaded', () => {
  const urlEl = document.getElementById('url');
  const latitudeEl = document.getElementById('latitude');
  const longitudeEl = document.getElementById('longitude');

  const googleLink = document.getElementById('googlelink');

  function show(url) {
    urlEl.textContent = url || 'n/a';
  }

  if (typeof chrome === 'undefined' || !chrome.tabs) {
    show('chrome API unavailable');
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs && tabs[0];
    if (!tab || !tab.url) {
      show('n/a');
      return;
    }
    const { lat, lng, zoom } = extract(tab.url);
    if (lat && lng) {
      latitudeEl.textContent = lat || 'n/a';
      longitudeEl.textContent = lng || 'n/a';

      googleLink.href = google_generate(lat, lng, zoom);

    } else {
      show('Unrecognized URL');
    }
  });
});
