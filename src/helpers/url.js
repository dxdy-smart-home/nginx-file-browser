export function isAutoIndexPath(path) {
  var lastSymbol = path[path.length - 1];
  return (lastSymbol == '/');
}

export function doAutoIndexPath(path) {
  return isAutoIndexPath(path) ? path : `${path}/`;
}

export function doApiPath(path) {
  return `/files${path}`;
}

export function doApiIndexPath(path) {
  var apiPath = doApiPath(path);
  return doAutoIndexPath(apiPath);
}

export function concatPath(endpoint, path) {
  return isAutoIndexPath(endpoint) ? endpoint + path : [endpoint, path].join('/')
}
