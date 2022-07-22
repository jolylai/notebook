/**
 *
 * @param {Function} func The function to delay
 * @param {Number} wait The number of milliseconds to delay invocation
 * @param  {...any} args The arguments to invoke func with
 * @returns {Number} Return the timer id
 */
function delay(func, wait = 0, ...args) {
  return setTimeout(() => {
    func.apply(this, args);
  }, wait);
}

export default delay;
