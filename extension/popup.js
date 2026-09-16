document.addEventListener('DOMContentLoaded', () => {
  const urlEl = document.getElementById('url');
  const fragEl = document.getElementById('fragment');

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
    try {
      const u = new URL(tab.url);
      const fullNoHash = u.origin + u.pathname + u.search;
      // remove leading '#' from hash
      show(tab.url);
    } catch (e) {
      show(tab.url);
    }
  });
});
