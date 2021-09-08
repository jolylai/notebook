---
title: 高阶函数
order: 1
group:
  title: 函数
---

在 JavaScript 中，函数为一等公民，所谓的 “一等公民”，指的是函数与其他数据类型一样，处于平等地位，可以赋值给其他变量，也可以作为参数，传入另一个函数，或作为其它函数的返回值。

## 高阶函数

高阶函数是至少满足下列一个条件的函数

- 接受一个或多个函数作为输入；
- 输出一个函数。

接收一个或多个函数作为输入，即函数作为参数传递。比如常用的 `Array.prototype.map()` 和 `Array.prototype.filter()` 高阶函数：

```js
// Array.prototype.map 高阶函数
const array = [1, 2, 3, 4];
const map = array.map(x => x * 2); // [2, 4, 6, 8]

// Array.prototype.filter 高阶函数
const words = ['semlinker', 'kakuqo', 'lolo', 'abao'];
const result = words.filter(word => word.length > 5); // ["semlinker", "kakuqo"]
```

而输出一个函数，即调用高阶函数之后，会返回一个新的函数。我们日常工作中，常见的 `debounce` 和 `throttle` 函数就满足这个条件，因此它们也可以被称为高阶函数。

## 组合函数

函数组合就是将两个或两个以上的函数组合生成一个新函数的过程：

```js
const composeFn = function(f, g) {
  return function(x) {
    return f(g(x));
  };
};
```

中间件和洋葱模型的 `compose` 函数

```js
function compose(middleware) {
  /**
   * @param {Object} context 上下文对象
   * @param {Function} next  中间件执行完后最终执行的函数
   */
  return function(context, next) {
    let index = -1;

    return dispatch(0);

    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }

      index = i;
      let fn = middleware[i];

      // 中间件执行完 最终执行 next
      if (i === middleware.length) fn = next;

      if (!fn) return Promise.resolve();

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}
```

## 柯里化

**柯里化（Currying**）是一种处理函数中含有多个参数的方法，并在只允许单一参数的框架中使用这些函数。这种转变是现在被称为 “柯里化” 的过程，在这个过程中我们能把一个带有多个参数的函数转换成一系列的嵌套函数。它返回一个新函数，这个新函数期望传入下一个参数。当接收足够的参数后，会自动执行原函数。

Lodash 中的柯里化函数

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

## 偏函数

**偏函数应用（Partial Application** 是指固定一个函数的某些参数，然后产生另一个更小元的函数。而所谓的元是指函数参数的个数，比如含有一个参数的函数被称为一元函数。

偏函数应用（Partial Application）很容易与函数柯里化混淆，它们之间的区别是：

- 偏函数应用是固定一个函数的一个或多个参数，并返回一个可以接收剩余参数的函数；
- 柯里化是将函数转化为多个嵌套的一元函数，也就是每个函数只接收一个参数。

#### 偏函数使用

```js
function buildUri(scheme, domain, path) {
  return `${scheme}://${domain}/${path}`;
}

const myGithubPath = _.partial(buildUri, 'https', 'github.com');
const profilePath = myGithubPath('semlinker/semlinker');
```

#### 偏函数实现

偏函数用于固定一个函数的一个或多个参数，并返回一个可以接收剩余参数的函数。

```js
export default function partial(func, ...partialArgs) {
  return function(...restArgs) {
    return func.apply(this, [...partialArgs, ...restArgs]);
  };
}
```

## 惰性函数

### 惰性载入函数

惰性载入就是当第 1 次根据条件执行函数后，在第 2 次调用函数时，就不再检测条件，直接执行函数。

```js
const addHandler = (function() {
  if (document.addEventListener) {
    return function(element, type, handler) {
      element.addEventListener(type, handler, false);
    };
  } else if (document.attachEvent) {
    return function(element, type, handler) {
      element.attachEvent('on' + type, handler);
    };
  } else {
    return function(element, type, handler) {
      element['on' + type] = handler;
    };
  }
})();
```

## 缓存函数

缓存函数是将函数的计算结果缓存起来，当下次以同样的参数调用该函数时，直接返回已缓存的结果，而无需再次执行函数。**这是一种常见的以空间换时间的性能优化手段**

```js
function memorize(func) {
  const cache = Object.create(null);
  return function(...args) {
    const stringifyArgs = JSON.stringify(args);
    return (cache[stringifyArgs] = func.apply(func, args));
  };
}
```

#### Reference

- [高阶的函数技术](https://juejin.cn/post/6892886272377880583)
