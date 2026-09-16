extract = function (url) {
  if (google_match(url)) {
    return google_extract(url);
  } else if (nls_match(url)) {
    return nls_extract(url);
  } else if (openinframap_match(url)) {
    return openinframap_extract(url);
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

// NLS
// https://maps.nls.uk/geo/explore/#zoom=18.2&lat=51.35210&lon=-0.42931&layers=269s&b=GoogleSat&o=66
// https://maps.nls.uk/geo/explore/side-by-side/#zoom=18.2&lat=51.35176&lon=-0.42815&layers=269s&right=ESRIWorld

nls_match = function (url) {
  return url.match(/maps\.nls\.uk\/geo/);
}

nls_extract = function (url) {
  const match = url.match(/#zoom=(-?[\d.]+)&lat=(-?[\d.]+)&lon=(-?[\d.]+)/);
  if (match) {
    const lat = match[2];
    const lng = match[3];
    const zoom = match[1];
    return { lat, lng, zoom };
  }
}

nls_generate_geo = function (lat, lng, zoom) {
  return `https://maps.nls.uk/geo/explore/#zoom=${zoom}&lat=${lat}&lon=${lng}`;
}

nls_generate_sxs = function (lat, lng, zoom) {
  return `https://maps.nls.uk/geo/explore/side-by-side/#zoom=${zoom}&lat=${lat}&lon=${lng}`;
}

// Open Infrastructure Map
// https://openinframap.org/#14.63/50.86946/-1.02788

openinframap_match = function (url) {
  return url.match(/openinframap\.org/);
}

openinframap_extract = function (url) {
  const match = url.match(/#(-?[\d.]+)\/(-?[\d.]+)\/(-?[\d.]+)/);
  if (match) {
    const lat = match[2];
    const lng = match[3];
    const zoom = parseFloat(match[1]) + 1;
    return { lat, lng, zoom };
  }
}

openinframap_generate = function (lat, lng, zoom) {
  zoom -= 1;
  return `https://openinframap.org/#${zoom}/${lat}/${lng}`;
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
