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
