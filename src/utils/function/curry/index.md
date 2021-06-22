---
title: curry
---

**柯里化（Currying**）是一种处理函数中含有多个参数的方法，并在只允许单一参数的框架中使用这些函数。这种转变是现在被称为 “柯里化” 的过程，在这个过程中我们能把一个带有多个参数的函数转换成一系列的嵌套函数。它返回一个新函数，这个新函数期望传入下一个参数。当接收足够的参数后，会自动执行原函数。

```js
const abc = function(a, b, c) {
  return [a, b, c];
};

const curried = _.curry(abc);

curried(1)(2)(3); // => [1, 2, 3]
curried(1, 2)(3); // => [1, 2, 3]
curried(1, 2, 3); // => [1, 2, 3]
```

在数学和理论计算机科学中的柯里化函数，一次只能传递一个参数。而对于 JavaScript 语言来说，在实际应用中的柯里化函数，可以传递一个或多个参数。

#### 实现柯里化

当柯里化后的函数接收到足够的参数后，就会开始执行原函数。而如果接收到的参数不足的话，就会返回一个新的函数，用来接收余下的参数。

```js
function curry(func) {
  return function curried(...args) {
    // 接收足够的参数
    if (args.length >= func.length) {
      // 执行原函数
      return func.apply(this, args);
    } else {
      // 接收部分参数
      return function(...partialArgs) {
        return curried.apply(this, args.concat(partialArgs));
      };
    }
  };
}
```
