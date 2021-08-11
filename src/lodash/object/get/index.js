import stringToPath from './stringToPath';

function get(object, path, defaultValue) {
  if (object == null) {
    return;
  }

  if (typeof path === 'string') {
    path = stringToPath(path);
  }

  const result = path.reduce((obj, cur) => obj && obj[cur], object);

  return result === undefined ? defaultValue : result;
}

export default get;
