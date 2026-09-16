extract = function (url) {
  if (google_match(url)) {
    return google_extract(url);
  }
  return { lat: 0, lng: 0, zoom: 0 };
}

// Google
// https://www.google.com/maps/@51.0271671,-1.1046418,11.96z?foo

google_match = function (url) {
  return url.match(/www\.google\.com\/maps/);
}

google_extract = function (url) {
  const match = url.match(/@([^,]+),([^,]+),([^z]+)z/);
  if (match) {
    const lat = match[1];
    const lng = match[2];
    const zoom = match[3];
    return { lat, lng, zoom };
  }
}

google_generate = function (lat, lng, zoom) {
  return `https://www.google.com/maps/@${lat},${lng},${zoom}z`;
}