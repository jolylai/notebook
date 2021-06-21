function after(n = 0, func) {
  return function() {
    if (--n < 1) {
      return func.apply(this, arguments);
    }
  };
}

export default after;
