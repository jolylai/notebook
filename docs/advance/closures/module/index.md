---
title: 模块
group:
  title: 闭包
nav:
  title: 进阶
  order: 30
---

## 模块模式

大多数模块依赖加载器 / 管理器本质上都是将这种模块定义封装进一个友好的 API。

模块模式需要具备两个必要条件。

1. 必须有外部的封闭函数，该**函数必须至少被调用一次**(每次调用都会创建一个新的模块实例)。
2. **封闭函数必须返回至少一个内部函数**，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

```js
function Math() {
  function add(a, b) {
    return a + b;
  }

  function sub(a, b) {
    return a - b;
  }

  return { add, sub };
}

var math = Math();
math.add(1, 2); // 3
math.sub(3, 2); // 1
```

Math() 只是一个函数，必须要通过调用它来创建一个模块实例。如果不执行外部函数，内部作用域和闭包都无法被创建。

一个具有函数属性的对象本身并不是真正的模块。一个从函数调用所返回的，只有数据属性而没有闭包函数的对象并不是真正的模块。

## 模块参数

模块也是普通的函数，因此可以接受参数:

## 单例模式

Math() 的独立的模块创建器，可以被调用任意多次， 每次调用都会创建一个新的模块实例。

```js
const math1 = Math();
const math2 = Math();
```

当只需要一个实例时，我们将模块函数转换成了 IIFE 来实现单例模式

```js
const math = (function Math() {
  function add(a, b) {
    return a + b;
  }

  function sub(a, b) {
    return a - b;
  }

  return { add, sub };
})();
```

## 现代模块

```js
const ModernModule = (() => {
  // 存储所有定义的模块
  const modules = {};

  /**
   * 定义模块
   * @param {String} name 模块名称
   * @param {Array} deps 依赖模块名称
   * @param {Function} impl 模块
   */
  const define = (name, deps, impl) => {
    const depModules = deps.map(depName => modules[depName]);

    modules[name] = impl.apply(impl, depModules);
  };

  const get = name => {
    return modules[name];
  };

  return { define, get };
})();
```

这段代码的核心是`modules[name] = impl.apply(impl, deps)`。为了模块的定义引入了包装 函数(可以传入任何依赖)，并且将返回值，也就是模块的 API，储存在一个根据名字来管 理的模块列表中。
定义模块

```js
// 定义一个 math 模块
ModernModule.define('math', [], function() {
  function add(a, b) {
    return a + b;
  }

  return { add };
});

ModernModule.define('index', ['math'], function(math) {
  const result = math.add(1, 2);
});
```
