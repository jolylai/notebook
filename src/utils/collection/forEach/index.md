---
title: forEach
group:
  title: Collection 集合
---

调用 iteratee 遍历 collection(集合) 中的每个元素， iteratee 调用 3 个参数： (value, index|key, collection)。 如果迭代函数（iteratee）显式的返回 false ，迭代会提前退出。

## 类数组

1. 不为 null 和 undefined
2. 不是函数
3. 有 length 属性
4. length 为 大于 -1 小于 `Number.MAX_SAFE_INTEGER` 的整数

```js
function isLength(value) {
  return (
    typeof value === 'number' &&
    value > -1 &&
    value % 1 === 0 &&
    value < Number.MAX_SAFE_INTEGER
  );
}

function isArrayLike(value) {
  return value != null && typeof value !== 'function' && isLength(value.length);
}
```

## ES6

## 数组迭代

```js
[1, 2, 3].forEach(function(value, index) {
  console.log(value);
});
// output: 1 2 3
```

对象迭代

```js
const obj = { one: 1, two: 2, three: 3 };

Object.entries(obj).forEach(([key, value], index) => {
  console.log(value);
});

//output: 1 2 3
```
