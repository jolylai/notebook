---
title: 隐式绑定
---

当函数引用有上下文对象时，隐式绑定规则会把函数中的 this 绑定到这个上下文对象。

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

obj.foo(); // 2
```

对象属性引用链中只有最顶层或者说最后一层会影响调用位置。

```js
function foo() {
  console.log(this.a);
}

var obj2 = {
  a: 42,
  foo: foo,
};

var obj1 = {
  a: 2,
  obj2: obj2,
};

obj1.obj2.foo(); // 42
```

#### 隐式丢失

一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式。

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

var bar = obj.foo; // 函数别名!
var a = 'oops, global'; // a 是全局对象的属性

bar(); // "oops, global"
```

一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时:

```js
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  // fn 其实引用的是 foo fn(); // <-- 调用位置!
}

var obj = {
  a: 2,
  foo: foo,
};

var a = 'oops, global'; // a 是全局对象的属性
doFoo(obj.foo); // "oops, global"
```

参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一 个例子一样。

```js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};
var a = 'oops, global'; // a 是全局对象的属性
setTimeout(obj.foo, 100); // "oops, global"
```

JavaScript 环境中内置的 setTimeout() 函数实现和下面的伪代码类似:

```js
function setTimeout(fn, delay) {
  // 等待 delay 毫秒
  fn(); // <-- 调用位置!
}
```
