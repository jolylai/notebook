function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

function isArray(value) {
  return Array.isArray(value);
}

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if (
    (value !== undefined && !eq(object[key], value)) ||
    (value === undefined && !(key in object))
  ) {
    baseAssignValue(object, key, value);
  }
}

function baseMerge(object, source) {
  function assignValue(srcValue, key) {
    const objValue = object[key];

    if (isPlainObject(objValue) && isPlainObject(srcValue)) {
      baseMerge(objValue, srcValue);
    } else if (isPlainObject(srcValue)) {
      baseMerge(objValue, srcValue);
    } else if (isArray(objValue) && isArray(srcValue)) {
      baseMerge(objValue, srcValue);
    } else if (isArray(srcValue)) {
      object[key] = srcValue.slice();
    } else {
      object[key] = srcValue;
    }
  }

  for (let key in source) {
    assignValue(source[key], key);
  }
}

function merge(object, ...sources) {
  for (let source of sources) {
    baseMerge(object, source);
  }

  return object;
}

export default merge;
