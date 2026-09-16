document.addEventListener('DOMContentLoaded', () => {
  const locationEl = document.getElementById('location');

  const googleLink = document.getElementById('googlelink');
  const osmLink = document.getElementById('osmlink');

  function show(message) {
    locationEl.textContent = message || 'n/a';
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
      const latString = parseFloat(lat).toFixed(6);
      const lngString = parseFloat(lng).toFixed(6);
      const locationString = `${latString}° ${lngString}°`;
      locationEl.textContent = locationString;

      googleLink.href = google_generate(lat, lng, zoom);
      osmLink.href = osm_generate(lat, lng, zoom);

    } else {
      show('Unrecognized URL');
    }
  });
});
