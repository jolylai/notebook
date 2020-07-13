# Map

## 为什么要用 Map

对象是创建无序键 / 值对数据结构 [ 也称为映射（map）] 的主要机制。但是，对象作为映射的主要缺点是不能使用非字符串值作为键。

```js
const json = {};

const x = { id: 1 };
const y = { id: 2 };

json[x] = "foo"; // {[object Object]: "foo"}
json[y] = "bar"; // {[object Object]: "bar"}

json[x]; // "bar"
json[y]; // "bar"
```

x 和 y 两个对象字符串化都是 "[object Object]"，所以 m 中只设置了一个键。

当然也可以自己维护两个平行数组，但是这样太复杂，在 ES6 中就不再需要这么做了！只需要使用 Map(..):

## 创建 map

```js
const x = { id: 1 };
const y = { id: 2 };

// 方法1
const m = new Map([[x, "foo"], [y, "bar"]]);

// 方法2
m.set(x, "foo");
m.set(y, "bar");
```

手动指定一个项目（entry）列表（键 / 值数组的数组）, 或者使用 set

## 如何使用

```js
const m = new Map();

const x = { id: 1 };
const y = { id: 2 };

// 设置map
m.set(x, "foo");
m.set(y, "bar");

// 确定一个 map 中是否有给定的键
m.has(x); // true

// 得到 map 的长度（也就是键的个数）
m.size; // 2

// 获取元素
m.get(x); // "foo"
m.get(y); // "bar"

// 删除一个元素
m.delete(y);

//  清除整个 map 的内容
m.clear();
```

这里唯一的缺点就是不能使用方括号 [ ] 语法设置和获取值，但完全可以使用 get(..) 和
set(..) 方法完美代替。

## 创建副本

Map(..) 构造器也可以接受一个 iterable，这个迭代器必须产生一列数组，每
个数组的第一个元素是键，第二个元素是值。

```js
var m2 = new Map(m.entries());
// 等价于：
// 推荐使用下面这种简短形式
var m2 = new Map(m);
```

因为 map 的实例是一个 iterable，它的默认迭代器与 entries() 相同，所以我们更推荐使用
后面这个简短的形式。

## Map 值

要从 map 中得到一列值，可以使用 values(..)，它会返回一个迭代器。

```js
Array.from(m.values()); // ["foo", "bar"]

[...m.values()]; // ["foo", "bar"]

[...m.entries()]; // [ [ {id: 1}, "foo" ], [ {id: 2}, "bar" ] ]
```

## Map 键

要得到一列键，可以使用 keys()，它会返回 map 中键上的迭代器

```js
[...m.keys()]; // [{id: 1}, {id: 2}]
```

## WeakMap

如果使用对象作为映射的键，这个对象后来被丢弃（所有的引用解除），试
图让垃圾回收（GC）回收其内存，那么 map 本身仍会保持其项目。

WeakMap 是 map 的变体，二者的多数外部行为特性都是一样的，区别在于内部内存分配
（特别是其 GC）的工作方式。

**WeakMap（只）接受对象作为键**。这些对象是被弱持有的，也就是说如果对象本身被垃圾
回收的话，在 WeakMap 中的这个项目也会被移除。

**WeakMap 没有 size 属性或 clear() 方法，也不会暴露任何键、值或项目上的迭代器。**
