function bind(context) {}

Function.prototype.bind2 = function(context) {
  const self = this;
  return function() {
    self.apply(context, arguments);
  };
};
