---
title: 工厂模式
group:
  title: 创建型模式
  order: 2
---

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/factory-method-zh.png)

## 问题

## 介绍

工厂方法模式是一种创建型设计模式， 其在父类中提供一个创建对象的接口， 允许子类决定实例化对象的类型。

将`new` 操作单独封装（遇到`new`时就要考虑是否需使用工厂模式）

## 使用场景

### Axios

```js
var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Allow use of default import syntax in TypeScript
module.exports.default = axios;
```

如果我们想要一个`axios`实例我们只需要调用`axios.create()` 我们无需关心他内部如何实现

```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});
```

### jQuery

```js
class jQuery {
    constructor(selector){
        ...
    }
}

window.$ = function(selector){
    return new jQuery(selector)
}
```

## 优缺点

- 避免创建者和具体产品之间的紧密耦合。
- 单一职责原则。 你可以将产品创建代码放在程序的单一位置， 从而使得代码更容易维护。
- 开闭原则。 无需更改现有客户端代码， 你就可以在程序中引入新的产品类型。
