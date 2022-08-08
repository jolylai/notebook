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

function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function() {
  return this.property;
};

function SubType() {
  this.subProperty = false;
}

SuperType.prototype = new SuperType();

SubType.prototype.getSubValue = function() {
  return this.subProperty;
};
