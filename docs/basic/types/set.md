# Set

set 是一个值的集合，其中的值唯一（重复会被忽略）

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
var s = new Set([1, 2, 3, 4, "1", 2, 4, "5"]),
  uniques = [...s];
uniques; // [1,2,3,4,"1","5"]
```

set 的唯一性不允许强制转换，所以 1 和 "1" 被认为是不同的值。

## WeakSet

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

::: tip
WeakSet 的值必须是对象，而并不像 set 一样可以是原生类型值。
:::
