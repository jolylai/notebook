export default function partial(func, ...partialArgs) {
  return function(...restArgs) {
    return func.apply(this, [...partialArgs, ...restArgs]);
  };
}
