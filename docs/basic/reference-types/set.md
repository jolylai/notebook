---
title: Set
---

## 前言

set 是一个值的集合，其中的值唯一（重复会被忽略）,使用严格对象相等的标准来检查值的匹配性。

## 创建

创建一个空的集合

```js
const emptySet = new Set();
```

如果想在创建的同时初始化实例，则可以给 Set 构造函数传入一个可迭代对象

```js
// 使用数组初始化集合
const s1 = new Set(['val1', 'val2', 'val3']);

const iterableObj = {
  [Symbol.iterator]: function*() {
    yield 'val1';
    yield 'val2';
    yield 'val3';
  },
};

const s2 = new Set(iterableObj);
```

可以使用 add()增加值，使用 has()查询，通过 size 取得元素数量，以及使用 delete() 和 clear()删除元素

```js
const s = new Set();

const x = { id: 1 };
const y = { id: 2 };

// 添加
s.add(x);
s.add(y);

// 重复被忽略
s.add(x);

// 测试值是否存在
s.has(x);

s.size; // 2

// 删除
s.delete(y);

// 清除所有
s.clear();
```

set 的 API 和 map 类似。只是 add(..) 方法代替了 set(..) 方法，没有 get(..) 方法。

## 迭代器

Set 会维护值插入时的顺序，因此支持按顺序迭代。

集合实例可以提供一个迭代器(Iterator)，能以插入顺序生成集合内容。可以通过 values()方法及其别名方法 keys()(或者 Symbol.iterator 属性，它引用 values())取得这个迭代器

```js
const s = new Set(['val1', 'val2', 'val3']);

alert(s.values === s[Symbol.iterator]); // true
alert(s.keys === s[Symbol.iterator]); // true

for (let value of s.values()) {
  alert(value);
}
// val1
// val2
// val3

for (let value of s[Symbol.iterator]()) {
  alert(value);
}
// val1
// val2
// val3
```

```js
const x = { id: 1 };
const y = { id: 2 };

const s = new Set([x, y]);

[...s.keys()]; // [{ id: 1 },{ id: 2 }]
[...s.values()]; // [{ id: 1 },{ id: 2 }]
[...s.entries()]; // [[{ id: 1 },{ id: 2 }],[{ id: 1 },{ id: 2 }]]
```

keys() 和 values() 迭代器都从 set 中 yield 出一列不重复的值。entries() 迭代器 yield 出
一列项目数组，其中的数组的两个项目都是唯一 set 值。set 默认的迭代器是它的 values()
迭代器。

```js
var s = new Set([1, 2, 3, 4, '1', 2, 4, '5']),
  uniques = [...s];
uniques; // [1,2,3,4,"1","5"]
```

set 的唯一性不允许强制转换，所以 1 和 "1" 被认为是不同的值。

## WeakSet

弱集合中的值只能是 Object 或者继承自 Object 的类型，尝试使用非对象设置值会抛出 TypeError。
就像 WeakMap 弱持有它的键（对其值是强持有的）一样，WeakSet 对其值也是弱持有的
（这里并没有键）：

```js
var s = new WeakSet();
var x = { id: 1 },
  y = { id: 2 };
s.add(x);
s.add(y);
x = null; // x可GC（垃圾回收）
y = null; // y可GC（垃圾回收）
```

WeakSet 的值必须是对象，而并不像 set 一样可以是原生类型值。
