import get from '../get';
import set from '../set';

/**
 *
 * @param {Object} object The source object
 * @param {String | Array} paths
 * @param {*} predicate
 * @returns
 */
function pickBy(object, predicate) {
  const paths = Object.keys(object);
  const result = {};

  for (path of paths) {
    const value = get(object, path);

    if (predicate(value, path)) {
      set(object, path, value);
    }
  }

  return result;
}

export default pickBy;
