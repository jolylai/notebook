---
title: this 全面解析
order: 1
---

## 前言

this 提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将 API 设计得更加简洁并且易于复用。

this 的绑定规则总共有下面 5 种。

1. 默认绑定（严格/非严格模式）
2. 隐式绑定
3. 显式绑定
4. new 绑定
5. 箭头函数绑定

如果要判断一个运行中函数的 this 绑定，就需要找到这个**函数的直接调用位置**。找到之后
就可以顺序应用下面这四条规则来判断 this 的绑定对象。

1. 由 new 调用,绑定到新创建的对象。
2. 由 call 或者 apply(或者 bind)调用?绑定到指定的对象。
3. 由上下文对象调用?绑定到那个上下文对象。
4. 默认:在严格模式下绑定到 `undefined`，否则绑定到全局对象。

一定要注意，有些调用可能在无意中使用默认绑定规则。如果想“更安全”地忽略 this 绑 定，你可以使用一个 DMZ 对象，比如 `ø = Object.create(null)`，以保护全局对象。

ES6 中的箭头函数并不会使用四条标准的绑定规则，而是根据当前的词法作用域来决定 this，具体来说，箭头函数会继承外层函数调用的 this 绑定(无论 this 绑定到什么)。这 其实和 ES6 之前代码中的 self = this 机制一样。

## 调用位置

调用位置就是函数在代码中被调用的位置(而不是声明的位置)。

```js
function baz() {
  // 当前调用栈是:baz
  // 因此，当前调用位置是全局作用域
  console.log('baz');
  bar(); // <-- bar 的调用位置
}

function bar() {
  // 当前调用栈是 baz -> bar
  // 因此，当前调用位置在 baz 中
  console.log('bar');
  foo(); // <-- foo 的调用位置
}

function foo() {
  // 当前调用栈是 baz -> bar -> foo // 因此，当前调用位置在 bar 中
  console.log('foo');
}

baz(); // <-- baz 的调用位置
```

## 绑定规则

函数的执行过程中调用位置如何决定 `this` 的绑定对象。

#### 硬绑定

```js
function foo() {
  console.log(this.a);
}

var obj = { a: 2 };

var bar = function() {
  foo.call(obj);
};

bar(); // 2

setTimeout(bar, 100); // 2

// 硬绑定的 bar 不可能再修改它的 this
bar.call(window); // 2
```

我们创建了函数 bar()，并在它的内部手动调用了 `foo.call(obj)`，因此强制把 foo 的 this 绑定到了 obj。无论之后如何调用函数 bar，它总会手动在 obj 上调用 foo。这种绑定是一种显式的强制绑定，因此我们称之为**硬绑定**。

硬绑定的典型应用场景就是创建一个包裹函数，传入所有的参数并返回接收到的所有值:

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = { a: 2 };

var bar = function() {
  return foo.apply(obj, arguments);
};

var b = bar(3); // 2 3
console.log(b); // 5
```

创建一个可以重复使用的辅助函数。

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

// 简单的辅助绑定函数
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments);
  };
}

var obj = { a: 2 };
var bar = bind(foo, obj);
var b = bar(3); // 2 3

console.log(b); // 5
```

ES5 内置了 `Function.prototype.bind`，bind 会返回一个硬绑定的新函数，用法如下。

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2,
};

var bar = foo.bind(obj);

console.log(bar(3)); // 5
```

#### API 调用的“上下文”

JS 许多内置函数提供了一个可选参数，被称之为“上下文”（context），其作用和 bind(..)一样，确保回调函数使用指定的 this。这些函数实际上通过 call(..)和 apply(..)实现了显式绑定。

```js
function foo(el) {
  console.log(el, this.id);
}

var obj = {
  id: 'awesome',
};

// 调用 foo(..) 时把 this 绑定到 obj
[1, 2, 3].forEach(foo, obj);
// 1 awesome 2 awesome 3 awesome
```

## 箭头函数

ES6 新增一种特殊函数类型：箭头函数，箭头函数无法使用上述四条规则，而是根据外层（函数或者全局）作用域（词法作用域）来决定 this。

```js
function foo() {
  // 返回一个箭头函数
  return a => {
    // this继承自foo()
    console.log(this.a);
  };
}

var obj1 = {
  a: 2,
};

var obj2 = {
  a: 3,
};

var bar = foo.call(obj1);
bar.call(obj2); // 2，不是3！
```

foo() 内部创建的箭头函数会捕获调用时 foo() 的 this。由于 foo() 的 this 绑定到 obj1， bar(引用箭头函数)的 this 也会绑定到 obj1，箭头函数的绑定无法被修改。(new 也不 行!)

箭头函数最常用于回调函数中，例如事件处理器或者定时器:

```js
function foo() {
  setTimeout(() => {
    // 这里的 this 在此法上继承自 foo()
    console.log(this.a);
  }, 100);
}

var obj = { a: 2 };
foo.call(obj); // 2
```

## 优先级

隐式绑定和显式绑定哪个优先级更高

```js
function foo() {
  console.log(this.a);
}

var obj1 = {
  a: 2,
  foo: foo,
};

var obj2 = {
  a: 3,
  foo: foo,
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2
```

可以看到，显式绑定优先级更高，也就是说在判断时应当先考虑是否可以应用显式绑定。

```js
function foo(something) {
  this.a = something;
}
var obj1 = { foo: foo };
var obj2 = {};

obj1.foo(2);
console.log(obj1.a); // 2

obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3

var bar = new obj1.foo(4);
console.log(obj1.a); // 2
console.log(bar.a); // 4
```

new 绑定比隐式绑定优先级高。
