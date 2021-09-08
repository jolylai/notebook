---
title: new 原理
---

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
