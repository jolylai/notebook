---
title: 类型
group:
  title: 指南
---

## 内置类型

JavaScript 有七种内置类型

- null
- undefined
- boolean
- number
- string
- object
- symbol -- ES6 新增

**Note**

- 除对象之外，其他统称为“基本类型”。
- 函数（function） 和 数组（[]）是 object 的子类型

## 类型检查

### typeof

用 `typeof` 运算符来查看值的类型，它返回的是类型的字符串值。

```js
typeof undefined === 'undefined'; // true
typeof true === 'boolean'; // true
typeof 42 === 'number'; // true
typeof '42' === 'string'; // true
typeof { life: 42 } === 'object'; // true
typeof Symbol() === 'symbol'; // true
```

来看一些特殊情况

```js
// 注意是 "object" 而不是 "null"
// 这是一个bug
typeof null === 'object'; // true
```

既然`typeof null` 返回的不是 `null`,那如何使用 `typeof` 来检测 `null` 值的类型

null 是基本类型中唯一的一个“假值”(falsy 或者 false-like)类型，`typeof` 对它的返回值为 "object"。

```js
const a = null;
// (!a -> true)  a 可能是 false 或 null 或 0 或 '' 或 undefined

!a && typeof a === 'object'; // true
```

函数检查

```js
typeof function a() {
  /* .. */
} === 'function'; // true
```

function(函数)也是 JavaScript 的一个内置类型。然而查阅规范就会知道， 它实际上是 object 的一个“子类型”。具体来说，函数是“可调用对象”，它有一个内部属 性 [[Call]]，该属性使其可以被调用。

**typeof 安全防范机制**

访问 "undeclared" 变量时这样报 错:ReferenceError: a is not defined， 并 且 typeof 对 undefined 和 undeclared 变 量 都 返 回 "undefined"。
然而，通过 typeof 的安全防范机制(阻止报错)来检查 undeclared 变量，有时是个不错的 办法。

```js
// 这样会抛出错误
if (DEBUG) {
  console.log('Debugging is starting');
}
// 这样是安全的
if (typeof DEBUG !== 'undefined') {
  console.log('Debugging is starting');
}
```

### instanceOf

instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

使用 instanceof 判断一个对象是否为数组，instanceof 会判断这个对象的原型链上是否会找到对应的 Array 的原型，找到返回 true，否则返回 false。

```js
[] instanceof Array; // true
```

但 instanceof 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。

```js
[] instanceof Object; // true
```

### Object.prototype.toString.call()

每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的话，会返回 [Object type]，其中 type 为对象的类型。但当除了 Object 类型的对象外，其他类型直接使用 toString 方法时，会直接返回都是内容的字符串，所以我们需要使用 call 或者 apply 方法来改变 toString 方法的执行上下文。

```js
const an = ['Hello', 'An'];
an.toString(); // "Hello,An"
Object.prototype.toString.call(an); // "[object Array]"
```

这种方法对于所有基本的数据类型都能进行判断，即使是 null 和 undefined 。

```js
Object.prototype.toString.call('An'); // "[object String]"
Object.prototype.toString.call(1); // "[object Number]"
Object.prototype.toString.call(Symbol(1)); // "[object Symbol]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(function() {}); // "[object Function]"
Object.prototype.toString.call({ name: 'An' }); // "[object Object]"
```

Object.prototype.toString.call() 常用于判断浏览器内置对象时。

### Array.isArray()

功能：用来判断对象是否为数组

instanceof 与 isArray

当检测 Array 实例时，Array.isArray 优于 instanceof ，因为 Array.isArray 可以检测出 iframes

```js
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length - 1].Array;
var arr = new xArray(1, 2, 3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr); // true
Object.prototype.toString.call(arr); // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
```

Array.isArray() 与 Object.prototype.toString.call()

Array.isArray()是 ES5 新增的方法，当不存在 Array.isArray() ，可以用 Object.prototype.toString.call() 实现。

```js
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```
