---
title: 闭包
group:
  title: 作用域与闭包
nav:
  title: 进阶
  order: 30
---

## 前言

**当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行**

红宝书(p178)上对于闭包的定义：**闭包是指有权访问另一个函数作用域中的变量的函数。**

MDN 对闭包的定义为：**闭包是指那些能够访问自由变量的函数。**

```js
function foo() {
  var a = 2;
  function bar() {
    console.log(a);
  }
  return bar;
}

var baz = foo();

baz(); // 2 —— 朋友，这就是闭包的效果。
```

无论使用何种方式对函数类型的值进行传递，当函数在别处被调用时都可以观察到闭包。

```js
function foo() {
  var a = 2;
  function baz() {
    console.log(a); // 2
  }
  bar(baz);
}
function bar(fn) {
  fn(); // 妈妈快看呀，这就是闭包!
}
```

传递函数当然也可以是间接的。

```js
var fn;
function foo() {
  var a = 2;
  function baz() {
    console.log(a);
  }
  fn = baz; // 将 baz 分配给全局变量
}
function bar() {
  fn(); // 妈妈快看呀，这就是闭包!
}
foo();
bar(); // 2
```

无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用 域的引用，无论在何处执行这个函数都会使用闭包。

## 常见闭包

```js
function wait(message) {
  setTimeout(function timer() {
    console.log(message);
  }, 1000);
}

wait('Hello, closure!');
```

将一个内部函数(名为 timer)传递给 `setTimeout(..)`。timer 具有涵盖`wait(..)` 作用域的闭包，因此还保有对变量 message 的引用。
`wait(..)` 执行 1000 毫秒后，它的内部作用域并不会消失，timer 函数依然保有`wait(..)`作用域的闭包。

深入到引擎的内部原理中，内置的工具函数 `setTimeout(..)` 持有对一个参数的引用，这个参数也许叫作 `fn` 或者 `func`，或者其他类似的名字。引擎会调用这个函数，在例子中就是 内部的 timer 函数，而词法作用域在这个过程中保持完整。

## 循环和闭包

思考以下代码输出什么

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

## 模块

```js
function CoolModule() {
  var something = 'cool';
  var another = [1, 2, 3];
  function doSomething() {
    console.log(something);
  }
  function doAnother() {
    console.log(another.join(' ! '));
  }
  return {
    doSomething: doSomething,
    doAnother: doAnother,
  };
}
var foo = CoolModule();
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

模块模式需要具备两个必要条件。

1. 必须有外部的封闭函数，该函数必须至少被调用一次(每次调用都会创建一个新的模块实例)。
2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

一个具有函数属性的对象本身并不是真正的模块。一个从函数调用所返回的，只有数据属性而没有闭包函数的对象并不是真正的模块。
