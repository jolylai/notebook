---
title: Promise
group:
  title: 异步
---

## 状态

pending resoved rejected

## 思考

### Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
});

promise.then(() => {
  console.log(3);
});

console.log(4);
```

执行结果是：1243
promise 构造函数是同步执行的，then 方法是异步执行的

## 链式调用

我们可以把多个的 promise 链接到一起以表示一系列异步步骤。这种方法可以实现的关键在于以下两个 Promise 固有行为特性。

- 每次 Promise 调用 then(),它都会创建并返回一个新的 Promise，我们可以将它链接起来。
- 不管从 then()调用的完成回调（第一个参数）返回的值是什么，它都会被自动设置为被链接 Promise(第一点中的)的完成

## then 中的返回值

```js
const p = Promise.resolve(21);
p.then(v => {
  console.log('v', v); // 21
  return v * 2;
}).then(v => {
  console.log('v', v); // 42
});
```

这里我们使用了 return 返回了 v\*2 ,这会立即完成链接的 promise，但如果步骤 2 需要步骤 1 异步完成一些事情呢？

```js
const p = Promise.resolve(21);
p.then(v => {
  console.log('v', v); // 21
  return new Promise((resolve, reject) => {
    resolve(v * 2);
  });
}).then(v => {
  console.log('v', v); // 42
});
```

这里我们 return 了一个新的 promise

#### Reference

- [JavaScript 中如何实现并发控制](https://mp.weixin.qq.com/s?__biz=MzI2MjcxNTQ0Nw==&mid=2247490704&idx=1&sn=18976b9c9fe2456172c394f1d9cae88b&scene=21#wechat_redirect)
