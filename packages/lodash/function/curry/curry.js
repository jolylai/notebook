function curry(func, arity) {
  const length = arity || func.length;
  let args = [];

  return function curried() {
    args.push(...arguments);

    if (args.length >= length) {
      return func.apply(this, args);
    }

    return curried;
  };
}

export default curry;
