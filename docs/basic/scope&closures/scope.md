---
title: 作用域闭包
---

## 实质问题

当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用 域之外执行

**闭包是指有权访问另一个函数作用域中的变量的函数。**

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
