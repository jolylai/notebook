---
title: 队列
---

队列数据结构的访问规则是 FIFO(First-In-First-Out， 先进先出)。

## 队列方法

队列在列表的末端添加项，从列表的前端移除项。

```js
// 创建数组
const queue = [];

// 推入两项
let count = queue.push(1, 2);
console.log(count); // 2

// 取得第一项
const item = queue.shift();
console.log(item); // 1
```

在数组的前端添加项，从数组末端移除项

```js
// 创建数组
const queue = [];

// 推入两项
let count = queue.unshift(1, 2);
console.log(count); // 2

// 取得第一项
const item = queue.pop();
console.log(item); // 2
```

## 使用场景

#### JS 异步中的任务队列

## 练习题

[933. 最近的请求次数](https://leetcode-cn.com/problems/number-of-recent-calls/submissions/)
