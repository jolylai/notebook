---
title: ESModule
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

## 现有模块标准

CJS 是 CommonJS 的缩写。只适用于 node 端：

```js
const _ = require('lodash');
module.exports = function doSomething(n) {};
```

AMD 代表异步模块定义。在浏览器端有效：使用 requireJS 来编写模块化，特点：依赖必须提前声明好。

```js
define(['dep1', 'dep2'], function(dep1, dep2) {
  return function() {};
});
```

CMD： 使用 seaJS 来编写模块化，特点：支持动态引入依赖文件。

```js
define(function(require, exports, module) {
  var indexCode = require('./index.js');
});
```

UMD 代表通用模块定义（Universal Module Definition）

```js
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD。注册为匿名模块
    define(['moduleB'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node。不支持严格CommonJS
    // 但可以在 Node 这样支持 module.exports 的
    // 类 CommonJS 环境下使用
    module.exports = factory(require(' moduleB '));
  } else {
    // 浏览器全局上下文(root 是 window)
    root.returnExports = factory(root.moduleB);
  }
})(this, function(moduleB) {
  // 以某种方式使用moduleB
  // 将返回值作为模块的导出
  // 这个例子返回了一个对象
  // 但是模块也可以返回函数作为导出值 return {};
});
```

兼容 AMD，CommonJS 模块化语法。

## ES6

```js
<script type="module">
  import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
  class App extends Component {
    state = {
      count: 0
    }
    add = () => {
      this.setState({ count: this.state.count + 1 });
    }
    render() {
      return html`
        <div class="app">
          <div>count: ${this.state.count}</div>
          <button onClick=${this.add}>Add Todo</button>
        </div>
      `;
    }
  }
  render(html`<${App} page="All" />`, document.body);
</script>
```

模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等。
IIFE： 使用自执行函数来编写模块化，特点：在一个单独的函数作用域中执行代码，避免变量冲突。

```js
(function() {
  return {
    data: [],
  };
})();
```

浏览器端 ESM 执行流程

1. 开启服务，托管资源（ES 源码）
2. 加载入口文件，浏览器模块化解析

   ![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/20211021094151.png)

3. 构建

   1. 遍历依赖树，先解析文件，然后找出依赖，最后又定位并加载这些依赖，如此往复。（下载所有的 js）
      ![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/20211021094034.png)

   2. 模块映射

      当加载器要从一个 URL 加载文件时，它会把 URL 记录到模块映射中，并把它标记为正在下载的文件。然后它会发出这个文件请求并继续开始获取下一个文件。
      ![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/20211021094330.png)

   3. 解析模块

      所有的模块都按照严格模式来解析的。不同文件类型按照不同的解析方式称。在浏览器中，通过 type="module" 属性告诉浏览器这个文件需要被解析为一个模块。不过在 Node 中，我们并不使用 HTML 标签，所以也没办法通过 type 属性来辨别。社区提出一种解决办法是使用 .mjs 拓展名。

4. 运行

   采用深度优先的后序遍历方式，顺着关系图到达最底端没有任何依赖的模块，然后设置它们的导出。模块映射会以 URL 为索引来缓存模块，以确保每个模块只有一个模块记录。这保证了每个模块只会运行一次。
