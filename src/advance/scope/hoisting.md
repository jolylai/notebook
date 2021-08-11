---
title: 提升
---

引擎会 在解释 JavaScript 代码之前首先对其进行编译。编译阶段中的一部分工作就是找到所有的 声明，并用合适的作用域将它们关联起来。

我们习惯将 var a = 2;看作一个声明，而实际上 JavaScript 引擎并不这么认为。它将 var a
和 a = 2 当作两个单独的声明，第一个是编译阶段的任务，而第二个则是执行阶段的任务。

## 函数优先

函数声明和变量声明都会被提升。但是一个值得注意的细节(这个细节可以出现在有多个“重复”声明的代码中)是函数会首先被提升，然后才是变量。

```js
foo(); // 1

var foo;

function foo() {
  console.log(1);
}

foo = function() {
  console.log(2);
};
```

这个代码片段会被引擎理解为如下形式:

```js
function foo() {
  console.log(1);
}

foo(); // 1

foo = function() {
  console.log(2);
};
```

var foo 尽管出现在 function foo()... 的声明之前，但它是重复的声明(因此被忽 略了)，因为函数声明会被提升到普通变量之前。
尽管重复的 var 声明会被忽略掉，但出现在后面的函数声明还是可以覆盖前面的。

```js
foo(); // 3
function foo() {
  console.log(1);
}
var foo = function() {
  console.log(2);
};
function foo() {
  console.log(3);
}
```

虽然这些听起来都是些无用的学院理论，但是它说明了在同一个作用域中进行重复定义是 非常糟糕的，而且经常会导致各种奇怪的问题。
一个普通块内部的函数声明通常会被提升到所在作用域的顶部，
