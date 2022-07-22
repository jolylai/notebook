/**
 *
 * @param {Object} object
 * @param {Object} source
 * @param {Function} customizer
 * @param {*} stack
 */
function baseMerge(object, source, customizer, stack) {
  for (const [key, srcValue] of Object.entries(source)) {
    console.log('srcValue: ', srcValue);
    console.log('key: ', key);

    let newValue = customizer
      ? customizer(object[key], srcValue, key, object, source, stack)
      : undefined;

    if (newValue == undefined) {
      newValue = srcValue;
    }

    object[key] = newValue;
  }
}

var object = {
  a: [{ b: 2 }, { d: 4 }],
};

var other = {
  a: [{ c: 3 }, { e: 5 }],
};

baseMerge(object, other);
console.log('object: ', object);
// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
