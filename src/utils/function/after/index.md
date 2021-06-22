---
title: after
---

创建一个函数，当他被调用 n 或更多次之后将马上触发 func 。

```js
function after(n, func) {
  n = n || 0;
  return function() {
    if (--n < 1) {
      return func.apply(this, arguments);
    }
  };
}
```
