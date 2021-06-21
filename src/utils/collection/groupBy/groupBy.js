const hasOwnProperty = Object.prototype.hasOwnProperty;

function groupBy(collection, iteratee) {
  return collection.reduce((result, value) => {
    const key = iteratee(value);

    if (hasOwnProperty.call(result, key)) {
      result[key].push(value);
    } else {
      result[key] = [value];
    }

    return result;
  }, {});
}

export default groupBy;
