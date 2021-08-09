---
title: merge
group:
  order: 2
---

## merge

该方法类似 \_.assign， 除了它递归合并 sources 来源对象自身和继承的可枚举属性到 object 目标对象。

1. 如果目标值存在，被解析为 undefined 的 sources 来源对象属性将被跳过。
2. 数组和普通对象会递归合并，其他对象和值会被直接分配覆盖。源对象从从左到右分配。后续的来源对象属性会覆盖之前分配的属性。

## 递归合并

数组和普通对象会递归合并，其他对象和值会被直接分配覆盖。

```js
function baseMerge(object, source) {
  function assignValue(srcValue, key) {
    const objValue = object[key];

    if (isPlainObject(objValue) && isPlainObject(srcValue)) {
      baseMerge(objValue, srcValue);
    } else if (isPlainObject(srcValue)) {
      baseMerge(objValue, srcValue);
    } else if (isArray(objValue) && isArray(srcValue)) {
      baseMerge(objValue, srcValue);
    } else if (isArray(srcValue)) {
      object[key] = srcValue.slice();
    } else {
      object[key] = srcValue;
    }
  }

  for (let key in source) {
    assignValue(source[key], key);
  }
}
```
