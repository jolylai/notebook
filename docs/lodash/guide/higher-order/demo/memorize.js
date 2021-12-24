export default function memorize(func) {
  const cache = Object.create(null);
  return function(...args) {
    const stringifyArgs = JSON.stringify(args);
    return (cache[stringifyArgs] = func.apply(func, args));
  };
}
