const obj = { a: 2 };

console.log(Object.getOwnPropertyDescriptor(obj, 'a'));

Object.defineProperty(obj, 'a', {
  configurable: false,
});

Object.defineProperty(obj, 'a', {
  configurable: true,
});
