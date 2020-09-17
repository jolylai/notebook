---
title: this 全面解析
---

- 作为普通函数
- 使用 call、apply、bind
- 作为对象方法被调用
- 在 class 方法中调用
- 箭头函数

如果要判断一个运行中函数的 this 绑定，就需要找到这个函数的直接调用位置。找到之后
就可以顺序应用下面这四条规则来判断 this 的绑定对象。

1. 由 new 调用?绑定到新创建的对象。
2. 由 call 或者 apply(或者 bind)调用?绑定到指定的对象。
3. 由上下文对象调用?绑定到那个上下文对象。
4. 默认:在严格模式下绑定到 undefined，否则绑定到全局对象。

一定要注意，有些调用可能在无意中使用默认绑定规则。如果想“更安全”地忽略 this 绑 定，你可以使用一个 DMZ 对象，比如 ø = Object.create(null)，以保护全局对象。

ES6 中的箭头函数并不会使用四条标准的绑定规则，而是根据当前的词法作用域来决定 this，具体来说，箭头函数会继承外层函数调用的 this 绑定(无论 this 绑定到什么)。这 其实和 ES6 之前代码中的 self = this 机制一样。

## 调用位置

调用位置就是函数在代码中被调用的位置(而不是声明的位置)。

```js
function baz() {
  // 当前调用栈是:baz
  // 因此，当前调用位置是全局作用域
  console.log('baz');
  bar(); // <-- bar 的调用位置
}

function bar() {
  // 当前调用栈是 baz -> bar
  // 因此，当前调用位置在 baz 中
  console.log('bar');
  foo(); // <-- foo 的调用位置
}

function foo() {
  // 当前调用栈是 baz -> bar -> foo // 因此，当前调用位置在 bar 中
  console.log('foo');
}

baz(); // <-- baz 的调用位置
```

## 绑定规则

函数的执行过程中调用位置如何决定 `this` 的绑定对象。

### 默认绑定

首先要介绍的是最常用的函数调用类型:独立函数调用。可以把这条规则看作是无法应用
其他规则时的默认规则。

```js
function foo() {
  console.log(this.a);
}

var a = 2;

foo(); // 2
```

foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，因此 `this` 指向全局对象。

如果使用严格模式(strict mode)，那么全局对象将无法使用默认绑定，因此 `this` 会绑定 到 `undefined`

```js
function foo() {
  'use strict';
  console.log(this.a);
}
var a = 2;
foo(); // TypeError: this is undefined
```

这里有一个微妙但是非常重要的细节，虽然 this 的绑定规则完全取决于调用位置，但是只 有 foo() 运行在非 strict mode 下时，默认绑定才能绑定到全局对象;严格模式下与 foo() 的调用位置无关:

```js
function foo() {
  console.log(this.a);
}

var a = 2;

(function() {
  'use strict';
  foo(); // 2
})();
```

### 隐式绑定

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

obj.foo(); // 2
```

对象属性引用链中只有最顶层或者说最后一层会影响调用位置。

```js
function foo() {
  console.log(this.a);
}

var obj2 = {
  a: 42,
  foo: foo,
};

var obj1 = {
  a: 2,
  obj2: obj2,
};

obj1.obj2.foo(); // 42
```

#### 隐式丢失

一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式。

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};
var bar = obj.foo; // 函数别名!
var a = 'oops, global'; // a 是全局对象的属性

bar(); // "oops, global"
```

一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时:

```js
function foo() {
  console.log(this.a);
}
function doFoo(fn) {
  // fn 其实引用的是 foo fn(); // <-- 调用位置!
}
var obj = {
  a: 2,
  foo: foo,
};

var a = 'oops, global'; // a 是全局对象的属性
doFoo(obj.foo); // "oops, global"
```

参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一 个例子一样。

```js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};
var a = 'oops, global'; // a 是全局对象的属性
setTimeout(obj.foo, 100); // "oops, global"
```

JavaScript 环境中内置的 setTimeout() 函数实现和下面的伪代码类似:

```js
function setTimeout(fn, delay) {
  // 等待 delay 毫秒
  fn(); // <-- 调用位置!
}
```

## 显式绑定

JavaScript 提供的绝大多数函数以及你自 己创建的所有函数都可以使用 call(..) 和 apply(..) 方法。通过 foo.call(..)，我们可以在调用 foo 时强制把它的 this 绑定到 obj 上。

```js
function foo() {
  console.log(this.a);
}
var obj = { a: 2 };
foo.call(obj); // 2
```

如果你传入了一个原始值(字符串类型、布尔类型或者数字类型)来当作 this 的绑定对 象，这个原始值会被转换成它的对象形式(也就是 `new String(..)`、`new Boolean(..)`或者 `new Number(..)`)。这通常被称为“装箱”。

### 硬绑定

```js
function foo() {
  console.log(this.a);
}

var obj = { a: 2 };

var bar = function() {
  foo.call(obj);
};

bar(); // 2

setTimeout(bar, 100); // 2

// 硬绑定的 bar 不可能再修改它的 this
bar.call(window); // 2
```

## new 绑定

在传统的面向类的语言中，“构造函数”是类中的一些特殊方法，使用 new 初始化类时会
调用类中的构造函数。通常的形式是这样的:

```js
something = new MyClass(..);
```

在 JavaScript 中，构造函数只是一些 使用 new 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上， 它们甚至都不能说是一种特殊的函数类型，它们只是被 new 操作符调用的普通函数而已。

实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。
使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建(或者说构造)一个全新的对象。
2. 这个新对象会被执行[[原型]]连接。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

```js
function foo(a) {
  this.a = a;
}

var bar = new foo(2);

console.log(bar.a); // 2
```

使用 new 来调用 foo(..) 时，我们会构造一个新对象并把它绑定到 foo(..) 调用中的 this 上。

## 优先级

隐式绑定和显式绑定哪个优先级更高

```js
function foo() {
  console.log(this.a);
}

var obj1 = {
  a: 2,
  foo: foo,
};

var obj2 = {
  a: 3,
  foo: foo,
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2
```

可以看到，显式绑定优先级更高，也就是说在判断时应当先考虑是否可以应用显式绑定。

```js
function foo(something) {
  this.a = something;
}
var obj1 = { foo: foo };
var obj2 = {};

obj1.foo(2);
console.log(obj1.a); // 2

obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3

var bar = new obj1.foo(4);
console.log(obj1.a); // 2
console.log(bar.a); // 4
```

new 绑定比隐式绑定优先级高。
