---
title: 优化逻辑判断
group:
  title: 概念
---

## 提前 return 减少嵌套

```js
function supply(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  // 条件 1: 水果存在
  if (fruit) {
    // 条件 2: 属于红色水果
    if (redFruits.includes(fruit)) {
      console.log('红色水果');
      // 条件 3: 水果数量大于 10 个
      if (quantity > 10) {
        console.log('数量大于 10 个');
      }
    }
  } else {
    throw new Error('没有水果啦!');
  }
}
```

如果提前 return 掉无效条件，将 if else 的多重嵌套层次减少到一层，更容易理解和维护。

```js
function supply(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (!fruit) throw new Error('没有水果啦'); // 条件 1: 当 fruit 无效时，提前处理错误

  if (!redFruits.includes(fruit)) return; // 条件 2: 当不是红色水果时，提前 return

  console.log('红色水果');

  // 条件 3: 水果数量大于 10 个
  if (quantity > 10) {
    console.log('数量大于 10 个');
  }
}
```

## 多条件分支的优化处理

当需要枚举值处理不同的业务分支逻辑时，第一反应是写下 if else ？

```js
function pick(color) {
  // 根据颜色选择水果
  if (color === 'red') {
    return ['apple', 'strawberry'];
  } else if (color === 'yellow') {
    return ['banana', 'pineapple'];
  } else if (color === 'purple') {
    return ['grape', 'plum'];
  } else {
    return [];
  }
}
```

`if else` 更适合于条件区间判断，而 `switch case` 更适合于具体枚举值的分支判断使用 `switch case` 优化上面的代码

```js
function pick(color) {
  // 根据颜色选择水果
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}
```

借助 Object 的 { key: value } 结构，我们可以在 Object 中枚举所有的情况，然后将 key 作为索引，直接通过 Object.key 或者 Object[key] 来获取内容

```js
const fruitColor = {
  red: ['apple', 'strawberry'],
  yellow: ['banana', 'pineapple'],
  purple: ['grape', 'plum'],
};
function pick(color) {
  return fruitColor[color] || [];
}
```

使用 Map 数据结构，真正的 (key, value) 键值对结构；

```js
const fruitColor = new Map()
  .set('red', ['apple', 'strawberry'])
  .set('yellow', ['banana', 'pineapple'])
  .set('purple', ['grape', 'plum']);

function pick(color) {
  return fruitColor.get(color) || [];
}
```

优化之后，代码更简洁、更容易扩展。

为了更好的可读性，还可以通过更加语义化的方式定义对象，然后使用 Array.filter 达到同样的效果。

```js
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'strawberry', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'pineapple', color: 'yellow' },
  { name: 'grape', color: 'purple' },
  { name: 'plum', color: 'purple' },
];

function pick(color) {
  return fruits.filter(f => f.color == color);
}
```

## 使用 Array.every 和 Array.some

判断所有的水果是否都为红色

```js
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' },
];

function test() {
  let isAllRed = true;

  // condition: all fruits must be red
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = f.color == 'red';
  }

  console.log(isAllRed); // false
}
```

使用 Array.every 简化代码

```js
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' },
];

function test() {
  // condition: short way, all fruits must be red
  const isAllRed = fruits.every(f => f.color == 'red');

  console.log(isAllRed); // false
}
```

判断是否含有红色的水果

```js
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' },
];

function test() {
  // condition: if any fruit is red
  const isAnyRed = fruits.some(f => f.color == 'red');

  console.log(isAnyRed); // true
}
```

## 使用 Array.includes 进行多条件判断

```js
// condition
function test(fruit) {
  if (fruit == 'apple' || fruit == 'strawberry') {
    console.log('red');
  }
}
```

如果有 `cherry` 和 `cranberries` 的红色水果，我们就需要通多写更多的 `||`

使用 `Array.includes` 重写上面的条件判断

```js
function test(fruit) {
  // 将判断条件抽取成一个数组
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (redFruits.includes(fruit)) {
    console.log('red');
  }
}
```

现在我们只需要将 `cherry` 和 `cranberries` 加入到 `redFruits` 数组中

## 函数默认值

我们总是需要效验函数参数若果是 `null` 和 `undefined`则赋一个初始值

```js
function test(fruit, quantity) {
  if (!fruit) return;
  // 如果没有传入 quantity 默认为 1
  const q = quantity || 1;

  console.log(`We have ${q} ${fruit}!`);
}

//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!

test('apple', 0); // We have 1 apple!
```

我们可以通过传入默认参数值消除变量 `q`

```js
function test(fruit, quantity = 1) {
  // 如果没有传入 quantity 默认为 1
  if (!fruit) return;
  console.log(`We have ${quantity} ${fruit}!`);
}

//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
```

我们可以通过 Babel 的转译来看一下默认参数是如何实现的。

```js
'use strict';

function test(fruit) {
  var quantity =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (!fruit) return;
  console.log('We have '.concat(quantity, ' ').concat(fruit, '!'));
}
```

从上面的转译结果可以发现，只有参数为 `undefined` 时才会使用默认参数。所以我们需要特别考虑 `null`

当处理比较简的对象时，解构与默认参数的配合是非常好的，但在一些复杂的场景中，我们面临的可能是更复杂的结构。

```js
const oneComplexObj = {
  firstLevel: {
    secondLevel: [
      {
        name: '',
        price: '',
      },
    ],
  },
};
```

这个时候如果再通过解构去获取对象里的值。

```js
const {
  firstLevel:{
    secondLevel:[{name,price]=[]
  }={}
} = oneComplexObj;
```

可读性就会比较差，而且需要考虑多层解构的默认值以及数据异常情况。

这种情况下，如果项目中使用 `lodash` 库，可以使用其中的 `lodash/get` 方法。

```js
import lodashGet from 'lodash/get';

const { name, price } = lodashGet(
  oneComplexObj,
  'firstLevel.secondLevel[0]',
  {},
);
```

## 策略模式优化分支逻辑处理

策略模式：定义一系列的算法，把它们一个个封装起来， 并且使它们可相互替换。

使用场景：策略模式属于对象行为模式，当遇到具有相同行为接口、行为内部不同逻辑实现的实例对象时，可以采用策略模式；或者是一组对象可以根据需要动态的选择几种行为中的某一种时，也可以采用策略模式；这里以第二种情况作为示例：

Before:

```js
const TYPE = {
  JUICE: 'juice',
  SALAD: 'salad',
  JAM: 'jam',
};
function enjoy({ type = TYPE.JUICE, fruits }) {
  if (!fruits || !fruits.length) {
    console.log('请先采购水果！');
    return;
  }
  if (type === TYPE.JUICE) {
    console.log('榨果汁中...');
    return '果汁';
  }
  if (type === TYPE.SALAD) {
    console.log('做沙拉中...');
    return '拉沙';
  }
  if (type === TYPE.JAM) {
    console.log('做果酱中...');
    return '果酱';
  }
  return;
}

enjoy({ type: 'juice', fruits });
```

使用思路：定义策略对象封装不同行为、提供策略选择接口，在不同的规则时调用相应的行为。

After：

```js
const TYPE = {
  JUICE: 'juice',
  SALAD: 'salad',
  JAM: 'jam',
};

const strategies = {
  [TYPE.JUICE]: function(fruits) {
    console.log('榨果汁中...');
    return '果汁';
  },
  [TYPE.SALAD]: function(fruits) {
    console.log('做沙拉中...');
    return '沙拉';
  },
  [TYPE.JAM]: function(fruits) {
    console.log('做果酱中...');
    return '果酱';
  },
};

function enjoy({ type = TYPE.JUICE, fruits }) {
  if (!type) {
    console.log('请直接享用！');
    return;
  }
  if (!fruits || !fruits.length) {
    console.log('请先采购水果！');
    return;
  }
  return strategies[type](fruits);
}

enjoy({ type: 'juice', fruits });
```

- [5 Tips to Write Better Conditionals in JavaScript](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript#toc-5-use-array-every-array-some-for-all-partial-criteria)
