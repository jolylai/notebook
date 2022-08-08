const obj = {
  a: 1,
  b: 2,
};
console.log('obj: ', obj);

function foo() {}

console.log(Object.getOwnPropertyDescriptor(obj.__proto__, 'a'));

foo.key = 'key';

for (let key in foo) {
  console.log('key: ', key);
}

// Object.defineProperty(obj, Symbol.iterator, {
//   enumerable: false,
//   value: function() {
//     const that = this;
//     const keys = Object.keys(that);
//     let idx = 0;

//     return {
//       next: function() {
//         return {
//           value: that[keys[idx++]],
//           done: idx > keys.length,
//         };
//       },
//     };
//   },
// });

// for (let item of obj) {
//   console.log('item: ', item);
// }

// obj is not iterable
