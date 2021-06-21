---
title: groupBy
---

- 创建一个对象，key 是 iteratee 遍历 collection(集合) 中的每个元素返回的结果。
- 分组值的顺序是由他们出现在 collection(集合) 中的顺序确定的。
- 每个键对应的值负责生成 key 的元素组成的数组。

```js
function groupBy(collection, iteratee) {
  return collection.reduce((result, value) => {
    const key = iteratee(value);

    if (hasOwnProperty.call(result, key)) {
      result[key].push(value);
    } else {
      result[key] = [value];
    }

    return result;
  }, {});
}
```
