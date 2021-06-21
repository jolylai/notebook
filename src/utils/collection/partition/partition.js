const identity = value => value;

function partition(collection, predicate = identity) {
  return collection.reduce(
    (result, value) => {
      if (predicate(value)) {
        result[0].push(value);
      } else {
        result[1].push(value);
      }

      return result;
    },
    [[], []],
  );
}

export default partition;
