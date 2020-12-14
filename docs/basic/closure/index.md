---
title: 闭包
group:
  title: 作用域与闭包
---

1. 手写 call、apply、bind 函数
2. 实际开发中的应用场景，举例说明

## 定义函数

```js
foo();

// 函数声明
function foo(arg0, arg1, arg2) {
  //函数体
}
```

这个例子不会抛出错误，因为函数声明重要特征**函数声明提升(function declaration hoisting)**在代码执行之前会先读取函数声明。

```js
bar(); //  Uncaught TypeError: bar is not a function

// 函数表达式
var bar = function(arg0, arg1, arg2) {
  //函数体
};
```

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

## 闭包

`闭包`是指有权访问另一个 函数作用域中的变量的函数。

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

## 实质问题

当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行

**闭包是指有权访问另一个函数作用域中的变量的函数。**

自由变量是在函数定义的地方向上级作用域查找，不是执行的地方

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
