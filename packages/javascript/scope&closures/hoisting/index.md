---
title: 提升
group:
  title: 作用域和闭包
  order: 1
---

## 前言

引擎会在解释 JavaScript 代码，分为两个阶段第一个是编译阶段的任务，而第二个则是执行阶段的任务。

引擎会在解释 JavaScript 代码之前首先对其进行编译。编译阶段中的一部分工作就是找到所有的声明，并用合适的作用域将它们关联起来。

我们习惯将 var a = 2;看作一个声明，而实际上 JavaScript 引擎并不这么认为。它将 var a
和 a = 2 当作两个单独的声明，第一个是编译阶段的任务，而第二个则是执行阶段的任务。

## 变量提升

```js
console.log(a);

var a = 2;
```

```js
a = 2;
var a;
console.log(a);
```

一
旦创建了新的词法环境，就会执行第一阶段。在第一阶段，没有执行代码，但是 JavaScript 引擎会访问并注册在当前词法环境中所声明的变量和函数。JavaScript 在第一阶段完成之后开始执行第二阶段，具体如何执行取决于变量的类型（let、var、const 和函数声明）以及环境类型（全局环境、函数环境或块级作用域）。

具体的处理过程如下：
1．如果是创建一个函数环境，那么创建形参及函数参数的默认
值。如果是非函数环境，将跳过此步骤。
2．如果是创建全局或函数环境，就扫描当前代码进行函数声明
（不会扫描其他函数的函数体），但是不会扫描函数表达式或箭头函
数。对于所找到的函数声明，将创建函数，并绑定到当前环境与函数名
相同的标识符上。若该标识符已经存在，那么该标识符的值将被重写。
如果是块级作用域，将跳过此步骤。
3．扫描当前代码进行变量声明。在函数或全局环境中，找到所有
当前函数以及其他函数之外通过 var 声明的变量，并找到所有在其他函
数或代码块之外通过 let 或 const 定义的变量。在块级环境中，仅查找当前
块中通过 let 或 const 定义的变量。对于所查找到的变量，若该标识符不存
在，进行注册并将其初始化为 undefined。若该标识符已经存在，将保留
其值。

## 函数提升

每个作用域都会进行提升操作。

```js
function foo() {
  var a;
  console.log(a); // undefined
  a = 2;
}
foo();
```

函数声明会被提升，但是函数表达式却不会被提升。

```js
foo(); // 不是 ReferenceError, 而是 TypeError!

var foo = function bar() {
  // ...
};
```

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
