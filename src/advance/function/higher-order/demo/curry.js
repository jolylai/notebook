export default function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...partialArgs) {
        return curried.apply(this, args.concat(partialArgs));
      };
    }
  };
}
