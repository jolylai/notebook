/**
 * Create a function that memoizes the result of func
 * @param {Function} func The function to have its output memoized
 * @param {Function} [resolver] The fucntion to resolve the cache key
 * @returns {Function} Returns the new memoized fucntion
 */
function memoize(func, resolver) {
  const memoized = function(...args) {
    const key = resolver ? resolver.apply(this, args) : args[0];

    const cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this, args);

    memoized.cache = cache.set(key, result) || cache;

    return result;
  };

  memoized.cache = new memoize.Cache();

  return memoized;
}

memoize.Cache = Map;

export default memoize;
