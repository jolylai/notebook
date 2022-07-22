---
title: 适配器
---

## 意图

**适配器模式**是一种结构型设计模式，它能使接口不兼容的对象能够相互合作。

适配器模式主要用来解决两个已有接口之间不匹配的问题，它不考虑这些接口是怎样实现的，也不考虑它们将来可能会如何演化。适配器模式不需要改变已有的接口，就能够使它们协同作用。

## Axios 中的适配器

```js
function isNodeEnv() {
  return (
    typeof process !== 'undefined' &&
    Object.prototype.toString.call(process) === '[object process]'
  );
}

function isBrowserEnv() {
  return typeof XMLHttpRequest !== 'undefined';
}

function getDefaultAdapter() {
  var adapter;
  if (isBrowserEnv()) {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (isNodeEnv()) {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}
```
