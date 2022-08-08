---
title: 对象原型
group:
  title: this 和对象原型
  order: 2
---

## 构造函数、原型对象和实例之间的关系

1.在 JS 里，万物皆对象。方法（Function）是对象，方法的原型(Function.prototype)是对象。因此，它们都会具有对象共有的特点。即：对象具有属性**proto**，可称为隐式原型，一个对象的隐式原型指向构造该对象的构造函数的原型，这也保证了实例能够访问在构造函数原型中定义的属性和方法。

2.方法(Function)方法这个特殊的对象，除了和其他对象一样有上述*proto*属性之外，还有自己特有的属性——原型属性（prototype），这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。原型对象也有一个属性，叫做 constructor，这个属性包含了一个指针，指回原构造函数。

### 原型对象

不像每个对象都有 `__proto__` 属性来标识自己所继承的原型，只有函数才有 `prototype` 属性。

当你创建函数时，JS 会为这个函数自动添加`prototype`属性，值是一个有 `constructor` 属性的对象，不是空对象。而一旦你把这个函数当作构造函数（constructor）调用（即通过 new 关键字调用），那么 JS 就会帮你创建该构造函数的实例，实例继承构造函数`prototype`的所有属性和方法（实例通过设置自己的 `__proto__` 指向承构造函数的`prototype`来实现这种继承）。

```js
function F() {}
var f = new F();
// 构造器
F.prototype.constructor === F; // true
F.__proto__ === Function.prototype; // true
Function.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null; // true

// 实例
f.__proto__ === F.prototype; // true
F.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null; // true
```

## instanceOf

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

```js
function myInstanceOf(object, func) {
  if (typeof object !== 'object' || object === null) return false;

  let proto = Object.getPrototypeOf(object);

  while (true) {
    if (proto === null) return false;
    if (proto === func.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
```
