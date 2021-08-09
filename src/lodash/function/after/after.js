/**
 * Create a function that invokes func
 * @param {Number} n The number of calls before func is invokes
 * @param {Function} func The function to restrict
 * @returns Return the new restricted function
 */
function after(n, func) {
  n = n || 0;
  return function() {
    if (--n < 1) {
      return func.apply(this, arguments);
    }
  };
}

export default after;
