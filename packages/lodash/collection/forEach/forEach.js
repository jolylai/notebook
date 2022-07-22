function arrayEach(array, iteratee) {
  let index = 0;

  while (++index < array.length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }

  return array;
}

function objectEach(object, iteratee) {
  for (let key in object) {
    if (iteratee(object[key], key, object) === false) {
      break;
    }
  }

  return object;
}

function isLength(value) {
  return (
    typeof value === 'number' &&
    value > -1 &&
    value % 1 === 0 &&
    value < Number.MAX_SAFE_INTEGER
  );
}

function isArrayLike(value) {
  return value != null && typeof value !== 'function' && isLength(value.length);
}

export default function forEach(collection, iteratee) {
  if (collection == null) return;

  if (Array.isArray(collection)) {
    arrayEach(collection, iteratee);
  } else {
    objectEach(collection, iteratee);
  }
}
