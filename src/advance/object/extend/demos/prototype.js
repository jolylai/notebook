function Car(brand) {
  this.brand = brand;
}

Car.prototype.getBranch = function() {
  return this.brand;
};

function Honda(color) {
  this.color = color;
}

Honda.prototype = new Car('Honda');

const honda = new Honda('white');

console.log('品牌', honda.getBranch());
