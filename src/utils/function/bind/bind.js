function bind(func, thisArg, ...particals) {
  return function() {
    func.apply(thisArg, particals);
  };
}

export default bind;
