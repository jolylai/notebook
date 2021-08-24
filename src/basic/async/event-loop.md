---
title: 事件循环
---

- 宏任务有哪些？微任务有哪些？宏任务和微任务触发时机
- 宏任务、微任务和 DOM 渲染关系？
- 宏任务、微任务和 DOM 渲染在 event loop 的过程？

## 单线程

JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。那么，为什么 JavaScript 不能有多个线程呢？这样能提高效率啊。

JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，为了避免复杂性，从一诞生，JavaScript 就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

## 调用栈

当我们调用一个函数时，它会被添加到一个叫做 调用栈 (call stack) 的地方，调用栈是 JS 引擎的一部分，而不是浏览器特有的。本质上它是一个栈，具有 后进先出 （Last In, First Out. 即 LIFO） 的特点。当一个函数调用完成，它就被从调用栈中弹出。

![](https://ask.qcloudimg.com/http-save/yehe-1429257/ve38nhdiey.gif)

## 任务列队

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

如果排队是因为计算量大，CPU 忙不过来，倒也算了，但是很多时候 CPU 是闲着的，因为 IO 设备（输入输出设备）很慢（比如 Ajax 操作从网络读取数据），不得不等着结果出来，再往下执行。

JavaScript 语言的设计者意识到，这时主线程完全可以不管 IO 设备，挂起处于等待中的任务，先运行排在后面的任务。等到 IO 设备返回了结果，再回过头，把挂起的任务继续执行下去。

于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，异步执行的运行机制如下。（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）

只要主线程空了，就会去读取"任务队列"，这就是 JavaScript 的运行机制。这个过程会不断重复。

在 JavaScript 中，异步任务被分为两种，一种宏任务（MacroTask）也叫 Task，一种叫微任务（MicroTask）。

### MacroTask（宏任务）

由浏览器规定

- script 全部代码
- setTimeout
- setImmediate（浏览器暂时不支持，只有 IE10 支持，具体可见 MDN）
- setInterval
- I/O
- UI 渲染

### MicroTask（微任务）

由 ES6 规定

- process.nextTick（Node 独有）
- promise
- Object.observe (废弃)
- MutationObserver

### 优先级

微任务(Microtasks) 的优先级要高于宏任务(macrotasks)。**在每一个事件循环之前，microtask 队列总是被清空（执行）。**

**注意：**

- 每一个 event loop 都有一个 microtask queue
- 每个 event loop 会有一个或多个 macrotask queue ( 也可以称为 task queue )
- 一个任务 task 可以放入 macrotask queue 也可以放入 microtask queue 中
- 每一次 event loop，会首先执行 microtask queue， 执行完成后，会提取 macrotask queue 的一个任务加入 microtask queue， 接着继续执行 microtask queue，依次执行下去直至所有任务执行结束。

为什么宏任务比微任务执行的早

1. 调用栈（call stack）清空，即同步任务执行完
2. 执行当前微任务
3. DOM 重新渲染，DOM 结构有变则重新渲染
4. 触发下一次 Event Loop（宏任务）

<Alert>
alert会阻断 js 执行，也会阻断DOM渲染
</Alert>

```js
const pElement = document.createElement('p');
pElement.innerText = '一段文字';

const rootElement = document.getElementById('root');
rootElement.appendChild(pElement);

Promise.resolve().then(() => {
  console.log(rootElement.childNodes.length);
  alert('DOM 还没有渲染');
});

setTimeout(() => {
  console.log(rootElement.childNodes.length);
  alert('DOM 渲染了');
}, 0);
```

宏任务：DOM 渲染后触发，如 settimeout
微任务：DOM 渲染前触发，如 Promise

## 事件循环

JS 主线程不断的循环往复的从任务队列中读取任务，执行任务，其中运行机制称为事件循环（event loop）。

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为 Event Loop（事件循环）。

JS 主线程拥有一个 执行栈（同步任务） 和 一个 任务队列（microtasks queue），主线程会依次执行代码

- 当遇到函数（同步）时，会先将函数入栈，函数运行结束后再将该函数出栈；
- 当遇到 task 任务（异步）时，这些 task 会返回一个值，让主线程不在此阻塞，使主线程继续执行下去，而真正的 task 任务将交给 浏览器内核 执行，浏览器内核执行结束后，会将该任务事先定义好的回调函数加入相应的 **任务队列（microtasks queue/ macrotasks queue)** 中。
- 当 JS 主线程清空执行栈之后，会按先入先出的顺序读取 microtasks queue 中的回调函数，并将该函数入栈，继续运行执行栈，**直到清空执行栈，再去读取任务队列。**
- 当 microtasks queue 中的任务执行完成后，会提取 macrotask queue 的一个任务加入 microtask queue， 接着继续执行 microtask queue，依次执行下去直至所有任务执行结束。

![](https://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png)

上图中，主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部 API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。

```js
console.log('script start');

setTimeout(function() {
  console.log('settimeout');
});

new Promise(resolve => {
  console.log('promise 1');
  resolve();
  console.log('promise 2');
}).then(function() {
  console.log('promise 3');
});

console.log('script end');

// 输出顺序：script start->promise 1 -> promise 2 -> script end -> promise 3 -> settimeout
```
