---
title: 前言
order: 1
nav:
  title: Lodash
---

- [Lodash](https://lodash.com/docs/4.17.15)

## 函数是一等公民

函数及函数式概念之所以如此重要，其原因之一在于函数是程序执行过程中的主要模块单元。除了全局 JavaScript 代码是在页面构建的阶段
执行的，我们编写的所有的脚本代码都将在一个函数内执行。

JavaScript 中函数拥有对象的所有能力，也因此函数可被作为任意其他类型对象来对待。当我们说函数是一等公民的时候，就是说函数也
能够实现以下功能。

函数声明

```js
function foo() {
  //函数体
}
```

函数表达式

```js
var bar = function(arg0, arg1, arg2) {
  //函数体
};
```

作为函数的参数来传递

```js
function foo(func) {
  //函数体
  func();
}
function bar() {
  //函数体
}

foo(bar);
```

作为函数的返回值

对象能做的任何一件事，函数也都能做。函数也是对象，唯一的特殊之处在于它是可调用的（invokable），即函数会被调用以便执行某项动作。

## 递归

递归函数是在一个函数通过名字调用自身的情况下构成的

```js
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
```

## 立即执行函数

IIFE，代表立即执行函数表达式 (Immediately Invoked Function Expression);

```js
var a = 2;

(function IIFE() {
  var a = 3;
  console.log(a); // 3
})();

console.log(a); // 2
```

IIFE 的另一个非常普遍的进阶用法是把它们当作函数调用并传递参数进去。

```js
var a = 2;
(function IIFE(global) {
  var a = 3;
  console.log(a); // 3 console.log( global.a ); // 2
})(window);
console.log(a); // 2
```

IFE 还有一种变化的用途是倒置代码的运行顺序，将需要运行的函数放在第二位，在 IIFE 执行之后当作参数传递进去。这种模式在 UMD(Universal Module Definition)项目中被广 泛使用。

```js
(function IIFE(def) {
  def(window);
})(function def(global) {
  var a = 3;
  console.log(a); // 3 console.log( global.a ); // 2
});
```

[JavaScript 高阶函数浅析](https://muyiy.cn/blog/6/6.1.html)
