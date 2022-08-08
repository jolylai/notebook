---
title: 默认绑定
order: 20
---

首先要介绍的是最常用的函数调用类型:独立函数调用。可以把这条规则看作是无法应用
其他规则时的默认规则。

```js
function foo() {
  console.log(this.a);
}

var a = 2;

foo(); // 2
```

foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，因此 `this` 指向全局对象。

如果使用严格模式(strict mode)，那么全局对象将无法使用默认绑定，因此 `this` 会绑定 到 `undefined`

```js
function foo() {
  'use strict';
  console.log(this.a);
}
var a = 2;
foo(); // TypeError: this is undefined
```

**虽然 this 的绑定规则完全取决于调用位置，但是只有 foo() 运行在非严格模式下时，默认绑定才能绑定到全局对象;严格模式下与 foo() 的调用位置无关:**

```js
function foo() {
  console.log(this.a);
}

var a = 2;

(function() {
  'use strict';
  foo(); // 2
})();
```
