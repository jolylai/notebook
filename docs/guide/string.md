---
title: String
group:
  title: 指南
---

## byteSize

```js
const byteSize = str => new Blob([str]).size;

byteSize('😀'); // 4
byteSize('Hello World'); // 11
```

## capitalize

将字符串的第一个字母转大写

> - String.prototype.toLowerCase(),
> - String.prototype.toUpperCase(),
> - Array.prototype.join()

```js
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

capitalize('fooBar'); // 'FooBar'
capitalize('fooBar', true); // 'Foobar'
```
