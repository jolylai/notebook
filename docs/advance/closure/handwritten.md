---
title: 手写
---

```js
String.prototype.trim = function() {
  return this.replace(/^\s+/, '').replace(/\s+$/, '');
};
```

```js
const max = function(arr) {
  return Math.max.apply(null, arr);
};
```

## 如何捕获异常

手动捕获

```js
try {
  //
} catch (error) {
  //
} finally {
  //
}
```

自动捕获异常

```js
window.onerror = function(message, source, lineno, colno, error) { ... }
```

参数详情

- `message`：错误信息（字符串）。可用于 HTML onerror=""处理程序中的 event。
- `source`：发生错误的脚本 URL（字符串）
- `lineno`：发生错误的行号（数字）
- `colno`：发生错误的列号（数字）
- `error`：Error 对象（对象）

* 对跨域的 js，如 CDN， 不会有详细的报错信息
* 对压缩的 js，需要配合 sourceMap 反查到未压缩代码的行、列

## 获取当前页面 URL 参数

传统

```js
function query(name) {
  const search = location.search.substr(1);
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');

  const result = search.match(reg);
  if (result === null) {
    return null;
  }
  return result[2];
}
```

URLSearchParams

```js
function query(name) {
  const search = location.search;
  const searchParams = new URLSearchParams(search);
  return searchParams.get(name);
}
```

## 数组扁平化

```js
function flat(arr) {
  const isDeep = arr.some(item => item instanceof Array);
  if (!isDeep) {
    return arr;
  }

  // 解构一层
  // Array.prototype.concat.apply([], [1,2,[3,4]]);  -> [1, 2, 3, 4]
  const res = Array.prototype.concat.apply([], arr);
  return flat(res);
}
```

## 深拷贝
