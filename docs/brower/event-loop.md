---
title: Event Loop
---

## 事件循环

JS 主线程不断的循环往复的从任务队列中读取任务，执行任务，其中运行机制称为事件循环（event loop）。

## Microtasks、Macrotasks（task）

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/microtasks.svg)

在 JavaScript 中，任务被分为两种，一种宏任务（MacroTask）也叫 Task，一种叫微任务（MicroTask）。

MacroTask（宏任务）

- script 全部代码
- setTimeout
- setImmediate（浏览器暂时不支持，只有 IE10 支持，具体可见 MDN）
- setInterval
- I/O
- UI 渲染

MicroTask（微任务）

- process.nextTick（Node 独有）
- promise
- Object.observe (废弃)
- MutationObserver

在高层次上，JavaScript 中有 microtasks 和 macrotasks（task），它们是异步任务的一种类型，Microtasks 的优先级要高于 macrotasks，microtasks 用于处理 I/O 和计时器等事件，每次执行一个。microtask 为 async/await 和 Promise 实现延迟执行，并在每个 task 结束时执行。在每一个事件循环之前，microtask 队列总是被清空（执行）。

**注意：**

- 每一个 event loop 都有一个 microtask queue
- 每个 event loop 会有一个或多个 macrotask queue ( 也可以称为 task queue )
- 一个任务 task 可以放入 macrotask queue 也可以放入 microtask queue 中
- 每一次 event loop，会首先执行 microtask queue， 执行完成后，会提取 macrotask queue 的一个任务加入 microtask queue， 接着继续执行 microtask queue，依次执行下去直至所有任务执行结束。

## 异步运行机制

JS 主线程拥有一个 执行栈（同步任务） 和 一个 任务队列（microtasks queue），主线程会依次执行代码

- 当遇到函数（同步）时，会先将函数入栈，函数运行结束后再将该函数出栈；
- 当遇到 task 任务（异步）时，这些 task 会返回一个值，让主线程不在此阻塞，使主线程继续执行下去，而真正的 task 任务将交给 浏览器内核 执行，浏览器内核执行结束后，会将该任务事先定义好的回调函数加入相应的 **任务队列（microtasks queue/ macrotasks queue)** 中。
- 当 JS 主线程清空执行栈之后，会按先入先出的顺序读取 microtasks queue 中的回调函数，并将该函数入栈，继续运行执行栈，直到清空执行栈，再去读取任务队列。
- 当 microtasks queue 中的任务执行完成后，会提取 macrotask queue 的一个任务加入 microtask queue， 接着继续执行 microtask queue，依次执行下去直至所有任务执行结束。

思考

```js
// 1. 开始执行
console.log(1); // 	2. 打印 1
setTimeout(function() {
  // 6. 浏览器在 0ms 后，将该函数推入任务队列
  console.log(2); // 7. 打印 2
  Promise.resolve(1).then(function() {
    // 8. 将 resolve(1) 推入任务队列  9. 将 function函数推入任务队列
    console.log('ok'); // 10. 打印 ok
  });
}); // 3.调用 setTimeout 函数，并定义其完成后执行的回调函数
setTimeout(function() {
  // 11. 浏览器 0ms 后，将该函数推入任务队列
  console.log(3); // 12. 打印 3
}); // 4. 调用 setTimeout 函数，并定义其完成后执行的回调函数
// 5. 主线程执行栈清空，开始读取 任务队列 中的任务
// output： 1  2 ok 3
```

## async await、Promise、setTimeout

### setTimeout

```js
console.log('script start'); //1. 打印 script start
setTimeout(function() {
  console.log('settimeout'); // 4. 打印 settimeout
}); // 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数
console.log('script end'); //3. 打印 script start
// 输出顺序：script start->script end->settimeout
```

### Promise

Promise 本身是同步的立即执行函数， 当在 executor 中执行 resolve 或者 reject 的时候, 此时是异步操作， 会先执行 then/catch 等，当主栈完成后，才会去调用 resolve/reject 中存放的方法执行，打印 p 的时候，是打印的返回结果，一个 Promise 实例。

```js
console.log('script start');
let promise1 = new Promise(function(resolve) {
  console.log('promise1');
  resolve();
  console.log('promise1 end');
}).then(function() {
  console.log('promise2');
});
setTimeout(function() {
  console.log('settimeout');
});
console.log('script end');
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout
```

当 JS 主线程执行到 Promise 对象时，

promise1.then() 的回调就是一个 task

- promise1 是 resolved 或 rejected ：那这个 task 就会放入当前事件循环回合的 microtask queue
- promise1 是 pending：这个 task 就会放入 事件循环的未来的某个(可能下一个)回合的 microtask queue 中

setTimeout 的回调也是个 task ，它会被放入 macrotask queue 即使是 0ms 的情况

### async await

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}

console.log('script start');
async1();
console.log('script end');

// 输出顺序：script start->async1 start->async2->script end->async1 end
```

async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。

await 的含义为等待，也就是 async 函数需要等待 await 后的函数执行完成并且有了返回结果（ Promise 对象）之后，才能继续执行下面的代码。await 通过返回一个 Promise 对象来实现同步的效果。

## 例子

```js
// 今日头条面试题
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function() {
  console.log('settimeout');
});
async1();
new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});
console.log('script end');
```

答案

```
script start
async1 start
async2
promise1
script end
async1 end
promise2
settimeout
```

eg

```js
const p = Promise.resolve();
(async () => {
  await p;
  console.log('await end');
})();
p.then(() => {
  console.log('then 1');
}).then(() => {
  console.log('then 2');
});
```

答案

```
then 1
then 2
await end
```

[reference](https://github.com/sisterAn/blog/issues/21)
