const encode = (state) => btoa(encodeURIComponent(JSON.stringify(state)));
const decode = (hash) => {
  try {
    return JSON.parse(decodeURIComponent(atob(hash)));
  } catch {
    return null;
  }
};

export function readFromUrl() {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash.startsWith("b=")) return null;
  return decode(hash.slice(2));
}

export function writeToUrl(state) {
  history.replaceState(null, "", `#b=${encode(state)}`);
}

export function buildShareUrl(state) {
  return `${location.origin}${location.pathname}#b=${encode(state)}`;
}
