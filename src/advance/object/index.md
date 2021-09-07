---
title: Object
---

## 属性描述符

```js
var obj = { a: 2 };

console.log(Object.getOwnPropertyDescriptor(obj, 'a'));

// {value: 2, writable: true, enumerable: true, configurable: true}
```

普通的对象属性对应的属性描述符(也被称为“数据描述符”，因为它 只保存一个数据值)可不仅仅只是一个 2。它还包含另外三个特性

- writable(可写)
- enumerable(可枚举)
- configurable(可配置)

创建普通属性时属性描述符

```js
var myObject = {};

Object.defineProperty(myObject, 'a', {
  value: 2,
  writable: true,
  configurable: true,
  enumerable: true,
});

myObject.a; // 2
```

### Writable

writable 决定是否可以修改属性的值。

```js
var myObject = {};
Object.defineProperty(myObject, 'a', {
  value: 2,
  writable: false, // 不可写! configurable: true, enumerable: true
});
myObject.a = 3;
myObject.a; // 2
```
