---
title: memoize
---

## 前言

1. 创建一个会缓存 func 结果的函数。
2. 如果提供了 resolver ，就用 resolver 的返回值作为 key 缓存函数的结果。 默认情况下用第一个参数作为缓存的 key。
3. func 在调用时 this 会绑定在缓存函数上。

## 缓存的 key

可能我们首先会想到闭包的方式来做缓存

```js
function memoize(func, resolver) {
  const cache = new Map();

  const memoized = function() {};

  return memoized;
}
```

最终返回的是一个函数，如果需要知道我们已经缓存哪些值时，只需要把缓存放在 `memoized.cache` 中暴露出去

```js
function memoize(func, resolver) {
  const memoized = () => {};

  memoized.cache = new Map();

  return memoized;
}
```

默认情况下用第一个参数作为缓存的 key。

缓存(cache) 作为 memoized 的 cache 属性暴露出去。自定义 `memoize.Cache`构造函数需要实现以下方法 `clear`, `delete`, `get`, `has`, and `set`.

## this

`func` 函数被执行时 `this` 绑定到 `memoized` 函数

```js
const func = function(a, b, c) {
  return a + this.b + this.c;
};

const memoized = memoize(func, func);
const object = { memoized, b: 2, c: 3 };
```

`func` 经过 `memoize` 后得到 `memoized` 函数, 此时如果直接执行 `memoized`，func 函数中的 this 应该指向 全局对象，经过 `const object = { memoized, b: 2, c: 3 };` 隐式绑定后

```js
function memoize(func, resolver) {
  const memoized = () => {
    func.apply(this, arguments);
  };

  return memoized;
}

function memoize(func, resolver) {
  const memoized = function() {
    func.apply(this, arguments);
  };

  return memoized;
}
```
