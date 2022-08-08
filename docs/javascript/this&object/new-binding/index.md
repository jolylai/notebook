---
title: new 绑定
order: 40
---

### new 绑定

在 JavaScript 中，构造函数只是一些使用 new 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上， 它们甚至都不能说是一种特殊的函数类型，它们只是被 new 操作符调用的**普通函数**而已。

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

## new 默认做了什么

```js
function Foo() {}

const foo = new Foo();
```

当代码 new Foo(...) 执行时，会发生以下事情：

- 一个继承自 Foo.prototype 的新对象被创建。
- 使用指定的参数调用构造函数 Foo ，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
- 由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤 1 创建的对象。

ES6 新增 symbol 类型，不可以使用 new Symbol()，因为 symbol 是基本数据类型，每个从 Symbol()返回的 symbol 值都是唯一的。

## 模拟实现

```js
function create(constructor, ...args) {
  // 创建一个空的对象并链接到原型，obj 可以访问构造函数原型中的属性
  const obj = Object.create(constructor.prototype);

  // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  const ret = constructor.apply(obj, args);

  // 优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
}
```
