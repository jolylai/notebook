---
title: Array
---

## 迭代器方法

在 ES6 中，Array 的原型上暴露了 3 个用于检索数组内容的方法

- `keys()`:返回数组索引的**迭代器**
- `values()`:返回数组元素的**迭代器**
- `entries()`:返回 索引/值对的**迭代器**

```js
const arr = ['foo', 'bar', 'baz', 'qux'];

Array.from(arr.keys()); //  [0, 1, 2, 3]
Array.from(arr.values()); //  ["foo", "bar", "baz", "qux"]
Array.from(arr.entries()); //  [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]
```

使用 ES6 的解构可以非常容易地在循环中拆分键/值对:

```js
for (let index of arr.keys()) {
  console.log('index: ', index);
}

for (let value of arr.values()) {
  console.log('value: ', value);
}

for (let [index, value] of arr.entries()) {
  console.log('index', index);
  console.log('value', value);
}
```

## 转换方法

所有对象都有 `toLocaleString()`、`toString()`和 `valueOf()`方法

```js
const colors = ['red', 'blue', 'green'];

console.log(colors.valueOf()); //  ['red', 'blue', 'green']
```

`valueOf()` 返回的还是数组本身

```js
let person1 = {
  toLocaleString() {
    return 'Nikolaos';
  },
  toString() {
    return 'Nicholas';
  },
};
let person2 = {
  toLocaleString() {
    return 'Grigorios';
  },
  toString() {
    return 'Greg';
  },
};
let people = [person1, person2];
alert(people);
alert(people.toString());
alert(people.toLocaleString()); // Nikolaos,Grigorios
```

`toString()`返回由数组中每个值的等效字符串拼接而成的一个逗号分隔的 字符串。也就是说，对数组的每个值都会调用其 `toString()`方法，以得到最终的字符串。

jion()

如果不给 join()传入任何参数，或者传入 undefined，则仍然使用逗号作为 分隔符。

**如果数组中某一项是 null 或 undefined，则在 join()、toLocaleString()、 toString()和 valueOf()返回的结果中会以空字符串表示。**

## 栈方法

**栈是一种后进先出(LIFO，Last-In-First-Out)的结构**，也就是最近添加的项先被删除。数据项的插入(称为推入，push)和删除(称为弹出，pop)只在栈的一个地方发生，即栈顶。

数组对象可以像栈一样，也就是一种限制插入和删除项的数据结构。

- `push()`方法接收任意数量的参数，并将它们**添加到数组末尾**，**返回数组的最新长度**。
- `pop()`方法则用于**删除数组的最后一项**，同时减少数组的 `length` 值，**返回被删除的项**。

```js
const stack = [];

let count = stack.push('red', 'blue');

let item = stack.pop();

console.log(stack);
```

## 队列方法

**队列以先进先出(FIFO，First-In-First-Out)**形式限制访问。

- `unshift()`:在数组开头添加任意多个值，然后返回新的数组长度。
- `shift()`:它会删除数 组的第一项并返回它，然后数组长度减 1。

```js
const queue = [];

let count = queue.push('red', 'blue');
let item = queue.shift();

console.log('queue: ', queue);
```

通过使用 `unshift()`和 `pop()`，可以在 相反方向上模拟队列，即在数组开头添加新数据，在数组末尾取得数据

```js
const queue = [];

let count = queue.unshift('red', 'blue');
let item = queue.pop();

console.log('queue: ', queue);
```

## 排序

`reverse()`方法就 是将数组元素反向排列

```js
let values = [1, 2, 3, 4, 5];
values.reverse();
alert(values); // 5,4,3,2,1
```

`reverse()`方法很直观，但不够灵活，所以才有了`sort()`方法。

默认情况下，`sort()`会按照**升序**重新排列数组元素，即最小的值在前面，最大的值在后面。为此，**`sort()`会在每一项上调用 `String()`转型函数，然后比较字符串来决定顺序。** 即使数组的元素都是数值，也会先把数组转换为字符串再比较、排序。

```js
let values = [0, 1, 5, 10, 15];
values.sort();
alert(values); // 0,1,10,15,5
```

比较函数接收两个参数，如果第一个参数应该排在第二个参数前面，就返回负值;如果两个参数相 等，就返回 0;如果第一个参数应该排在第二个参数后面，就返回正值。

```js
const values = [0, 1, 5, 10, 15];

function compare(value1, value2) {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
}

values.sort(compare);
console.log('values: ', values);
```

如果数组的元素是数值，或者是其 valueOf()方法返回数值的对象(如 Date 对象)，这个比较函 数还可以写得更简单，因为这时可以直接用第二个值减去第一个值

```js
function compare(value1, value2) {
  return value2 - value1;
}
```

<Alert>
reverse() 和 sort() 都返回调用它们的数组的引用。
</Alert>

在一个字符串数组中有红、黄、蓝三种颜色的球，且个数不相等、顺序不一致，请为该数组排序。使得排序后数组中球的顺序为:黄、红、蓝。

例如：红蓝蓝黄红黄蓝红红黄红，排序后为：黄黄黄红红红红红蓝蓝蓝。

```js
const colors = [
  '红',
  '蓝',
  '蓝',
  '黄',
  '红',
  '黄',
  '蓝',
  '红',
  '红',
  '黄',
  '红',
];

const colorPriorty = {
  黄: 0,
  红: 1,
  蓝: 2,
};

function sortColors(colors, priorty) {
  return colors.sort((a, b) => {
    return priorty[a] - priorty[b];
  });
}

console.log('sortColors', sortColors(colors, colorPriorty));
```

## 操作方法

`concat()`方法可以在现有数组全部元素基础上 创建一个新数组。它首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组。如果传入一个或多个数组，则 `concat()`会把这些数组的每一项都添加到结果数组。 如果参数不是数组，则直接把它们添加到结果数组末尾。
