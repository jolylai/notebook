---
title: 练习题
---

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

1. 描述 event loop 机制，可画图
2. 什么是微任务和宏任务，两者有什么区别

```js
Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .catch(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });
```

```js
Promise.resolve()
  .then(() => {
    console.log(1);
    throw new Error('error1');
  })
  .catch(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });
```

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('js start');

setTimeout(() => {
  console.log('settimeout');
}, 0);

async1();

Promise.resolve(function(resolve) {
  console.log('promise 1');
  resolve();
}).then(function() {
  console.log('promise 2');
});

console.log('js end');
```
