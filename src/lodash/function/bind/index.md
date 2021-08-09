---
title: bind
---

```js
function bind(func, thisArg, ...particals) {
  return function() {
    func.apply(thisArg, particals);
  };
}
```
