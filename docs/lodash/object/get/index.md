---
title: get
---

## 前言

根据 object 对象的 path 路径获取值。 如果解析 value 是 `undefined` 会以 defaultValue 取代。

## stringToPath

如果传入的路径是字符串，需将字符串路径转换成数组，如 `'a[0].b.c'` 转换成 `['a', '0', 'b', 'c']`

```js
const regexp = /\[([^\[\]]*)\]/g;

function stringToPath(string) {
  return string
    .replace(regexp, '.$1.')
    .split('.')
    .filter(path => path !== '');
}
```

`/\[([^\[\]]*)\]/g` 配 `[]` 中的属性名，`string.replace(/\[([^\[\]]*)\]/g, '.$1.')` 将 `[0]` 转换成 `.0.`

## 取值

获取到路径数组后，需要迭代路径数组获取到对应的值

```js
function get(object, path, defaultValue) {
  path = stringToPath(path);

  const result = path.reduce((obj, cur) => obj && obj[cur], object);

  return result === undefined ? defaultValue : result;
}
```

这里可以使用 `reduce` 迭代获取值也可以使用 `while`

```js
function get(object, path, defaultValue) {
  path = stringToPath(path);

  let index = 0;

  while (object != null && index < path.length) {
    object = object[path[index++]];
  }

  return index && index === path.length ? object : defaultValue;
}
```
