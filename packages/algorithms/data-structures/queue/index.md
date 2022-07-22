---
title: 队列
order: 30
---

队列(queue) 是一种特殊类型的抽象数据类型或集合。集合中的实体按顺序保存。

队列基本操作有两种：入队和出队。从队列的后端位置添加实体，称为入队；从队列的前端位置移除实体，称为出队。

队列中元素先进先出 FIFO (first in, first out)的示意

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/queue.svg)

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
