---
title: call 和 apply
---

## 类型验证

## 获取数组中的最大值和最小值

```js
var numbers = [5, 458, 120, -215];

Math.max.apply(Math, numbers); //458
Math.max.call(Math, 5, 458, 120, -215); //458

// ES6
Math.max.call(Math, ...numbers); // 458
```
