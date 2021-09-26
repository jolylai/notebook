---
title: 对象
---

## 复制对象

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

### configurable

把 configurable 修改成 false 是单向操作，无法撤销!

```js
const obj = { a: 2 };

Object.defineProperty(obj, 'a', {
  configurable: false,
});

Object.defineProperty(obj, 'a', {
  configurable: true,
});

// TypeError: Cannot redefine property
```

## 遍历

### for...in

for...in 语句以**任意顺序**遍历一个对象的除 Symbol 以外的可枚举属性(包括 `[[Prototype]]` 链)。

```js
const obj = { a: 2 };
```

### for...of

for...of 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
