/**
 *
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0]
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 */
function debounce(func, wait, options = {}) {
  let timerId, lastCallTime, lastInvokeTime;

  wait = +wait || 0;
  timerId = setTimeout(() => {}, wait);

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSiceLastInvoke = time - lastInvokeTime;

    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0
    );
  }

  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
  }

  return debounced;
}

export default debounce;
