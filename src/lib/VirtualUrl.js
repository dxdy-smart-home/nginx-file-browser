export default class VirtualURL extends URL {
  static current() {
    const locationHash = window.location.hash;
    const virtualPath = locationHash ? locationHash.substr(1) : "/";

    return new VirtualURL(window.location.origin + virtualPath);
  }

  static redirectTo(path, params) {
    window.location.hash = `#${path}?${params.toString()}`;
  }
}
