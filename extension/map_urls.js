extract = function (url) {
  if (google_match(url)) {
    return google_extract(url);
  } else if (osm_match(url)) {
    return osm_extract(url);
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

// OSM
// https://www.openstreetmap.org/#map=17/51.352748/-0.429261&layers=N

osm_match = function (url) {
  return url.match(/www\.openstreetmap\.org/);
}

osm_extract = function (url) {
  const match = url.match(/#map=(-?[\d.]+)\/(-?[\d.]+)\/(-?[\d.]+)/);
  if (match) {
    const lat = match[2];
    const lng = match[3];
    const zoom = match[1];
    return { lat, lng, zoom };
  }
}

osm_generate = function (lat, lng, zoom) {
  return `https://www.openstreetmap.org/#map=${zoom}/${lat}/${lng}`;
}
