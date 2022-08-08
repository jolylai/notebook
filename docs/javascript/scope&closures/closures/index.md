---
title: 闭包
---

## 工作原理

### 词法环境

## 通过执行上下文来跟踪代码

全局执行上下文和函数执行上下文。二者最重要的差别是：全局执行上下文只有一个，当 JavaScript 程序开始执行时就已经创建了全局上下文；而函数执行上下文是在每次调用函数时，就会创建一个新的。

在某个特定的时刻只能执行特定的代码。一旦发生函数调用，当前的执行上下文必须停止执行，并创建新的函数执行上下文来执行函数。当函数执行完成后，将函数执行上下文销毁，并重新回到发生调用时的执行上下文中。所以需要跟踪执行上下文——正在执行的上下文以及正在等待的上下文。最简单的跟踪方法是使用执行上下文栈（或称为调用栈）。

```js
function skulk(ninja) {
  report(ninja + 'skulking');

  // 个函数调用另外一个函数
}
function report(message) {
  console.log(message);
}
// 通过内置的console.log方法发送消息
skulk('Kuma');
skulk('Yoshi');
// 在全局中分别调用两个函数
```

1. 每个 JavaScript 程序只创建一个全局执行上下文，并从全局执行上下文开始执行（在单页应用中每个页面只有一个全局执行上下文）。当执行全局代码时，全局执行上下文处于活跃状态。
2. 首先在全局代码中定义两个函数：skulk 和 report，然后调用 skulk("Kuma")。由于在同一个特定时刻只能执行特定代码，所以 JavaScript 引擎停止执行全局代码，开始执行带有 Kuma 参数的 skulk 函数。创建新的函数执行上下文，并置入执行上下文栈的顶部。
3. skulk 函数进而调用 report 函数。又一次因为在同一个特定时刻只能执行特定代码，所以，暂停 skulk 执行上下文，创建新的 Kuma 作为参数的 report 函数的执行上下文，并置入执行上下文栈的顶部。
4. report 通过内置函数 console.log 打印出消息后，report 函数执行完成，代码又回到了 skulk 函数。report 执行上下文从执行上下文栈顶部弹出，skulk 函数执行上下文重新激活，skulk 函数继续执行。
5. skulk 函数执行完成后也发生类似的事情：skulk 函数执行上下文从栈顶端弹出，重新激活一直在等待的全局执行上下文并恢复执行。JavaScript 的全局代码恢复执行。

## 使用闭包

### 封装私有变量

## 定义

你不知道的 JavaScript： **当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行**。

高级程序设计(p178)：**闭包是指有权访问另一个函数作用域中的变量的函数。**

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

函数 bar() 的词法作用域能够访问 foo() 的内部作用域。然后我们将 bar() 函数本身当作 一个值类型进行传递。在这个例子中，我们将 bar 所引用的函数对象本身当作返回值。

在 foo() 执行后，其返回值(也就是内部的 bar() 函数)赋值给变量 baz 并调用 baz()，实 际上只是通过不同的标识符引用调用了内部的函数 bar()。

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
