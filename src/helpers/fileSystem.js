const FileRoot = "/";

export function getParentDir(path) {
  if(path.length <= 1) return null;

  var lastSlashPos = path.lastIndexOf("/", path.length - 2);
  var parentDir = lastSlashPos >= 0 ? path.substr(0, lastSlashPos + 1) : null;

  return parentDir;
}

export function prettySize(bytes) {
  var exp = Math.log(bytes) / Math.log(1024) | 0;
  var value = bytes / Math.pow(1024, exp);

  if (exp == 0) return value.toFixed(0) + ' bytes';

  var result = value.toFixed(2);
  return result + ' ' + 'KMGTPEZY'[exp - 1] + 'B';
}

export function isRootDir(path) {
  return path === FileRoot;
}
