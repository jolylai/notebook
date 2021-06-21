export default function throttle(func, wait = 50) {
  let previousCallTimeStamp;

  return function() {
    const nowStamp = Date.now();

    if (nowStamp - previousCallTimeStamp >= wait) {
      previousCallTimeStamp = newStamp;
      return func.apply(this, arguments);
    }
  };
}
