---
title: delay
---

## setTimeout

```js
setTimeout(() =>{
  console.log('setTimeout 1 second)
}), 1000);
```

```js
function delay(func, wait = 0, ...args) {
  return setTimeout(func, +wait, ...args);
}
```
