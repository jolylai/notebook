/**
 *
 * @param {Number} n The number of call before func invoked
 * @param {Function} func
 */
function before(n, func) {
  return () => {
    if (--n) {
      func.apply(this, arguments);
    }
  };
}
