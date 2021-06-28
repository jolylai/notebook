---
title: HTML5 事件
group:
  title: 事件
---

## 概览

HTML 页面的生命周期包含三个重要事件：

- `DOMContentLoaded` —— 浏览器已完全加载 HTML，并构建了 DOM 树，但像 `<img>` 和样式表之类的外部资源可能尚未加载完成。
- `load` —— 浏览器不仅加载完成了 HTML，还加载完成了所有外部资源：图片，样式等。
- `beforeunload/unload` —— 当用户正在离开页面时。

每个事件都是有用的：

DOMContentLoaded 事件 —— DOM 已经就绪，因此处理程序可以查找 DOM 节点，并初始化接口。
load 事件 —— 外部资源已加载完成，样式已被应用，图片大小也已知了。
beforeunload 事件 —— 用户正在离开：我们可以检查用户是否保存了更改，并询问他是否真的要离开。
unload 事件 —— 用户几乎已经离开了，但是我们仍然可以启动一些操作，例如发送统计数据。

## DOMContentLoaded

`DOMContentLoaded` 事件会在 DOM 树构建完成后立即触发，而 **不用等待图片、JavaScript 文件、CSS 文件或其他资源加载完成。** 相对于 load 事件，DOMContentLoaded 可以让开发者在外部资 18 源下载的同时就能指定事件处理程序，从而让用户能够更快地与页面交互。

### 图片

<code src="./demos/DOMContentLoaded.jsx" inline />

```html
<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0" />

<script>
  function ready() {
    const img = document.getElementById('img');

    // 图片目前尚未加载完成（除非已经被缓存），所以图片的大小为 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }
  document.addEventListener('DOMContentLoaded', ready, false);
</script>
```

DOMContentLoaded 处理程序在文档加载完成后触发，所以它可以查看所有元素，包括它下面的 `<img>` 元素。但是，它不会等待图片加载。因此，显示其大小为零。

对于不支持 DOMContentLoaded 事件的浏览器，可以使用超时为 0 的 setTimeout()函数，通过 其回调来设置事件处理程序

```js
setTimeout(() => {
  // 在这里添加事件处理程序
}, 0);
```

### 脚本

当浏览器处理一个 HTML 文档，并在文档中遇到 `<script>` 标签时，就会在继续构建 DOM 之前运行它。这是一种防范措施，因为脚本可能想要修改 DOM，甚至对其执行 document.write 操作，所以 DOMContentLoaded 必须等待脚本执行结束。

```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    alert('DOM ready!');
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert('Library loaded, inline script executed');
</script>
```

在上面这个例子中，我们首先会看到 “Library loaded…”，然后才会看到 “DOM ready!”（所有脚本都已经执行结束）。

### 样式

外部样式表不会影响 DOM，因此 DOMContentLoaded 不会等待它们。但这如果在样式后面有一个脚本，那么该脚本必须等待样式表加载完成

```html
<link type="text/css" rel="stylesheet" href="style.css" />
<script>
  // 在样式表加载完成之前，脚本都不会执行
  alert(getComputedStyle(document.body).marginTop);
</script>
```

脚本可能想要获取元素的坐标和其他与样式相关的属性,因此，它必须等待样式加载完成。当 DOMContentLoaded 等待脚本时，它现在也在等待脚本前面的样式。

## readystatechange

`readystatechange` 事件旨在提供文档或元素加载状态的信息。支持 `readystatechange` 事件的每个对象都有一个 `readyState` 属性，该属性具有一个以下列出的可能的字符串值。

- `uninitialized`:对象存在并尚未初始化。
- `loading`:对象正在加载数据。
- `loaded`:对象已经加载完数据。
- `interactive`:对象可以交互，但尚未加载完成。
- `complete`:对象加载完成。

<code src="./demos/ReadyStateChange.jsx" inline />

在 document 上使用时，值为"interactive"的 readyState 首先会触发 readystatechange 事件，时机类似于 DOMContentLoaded。进入交互阶段，意味着 DOM 树已加载完成，因而可以安全地 交互了。此时图片和其他外部资源不一定都加载完了。

```js
// 当前状态
console.log(document.readyState);

// 状态改变时打印它
document.addEventListener('readystatechange', event => {
  console.log(document.readyState);
  if (document.readyState == 'interactive') {
    console.log('Content loaded');
  }
});
```

在某些情况下，我们不确定文档是否已经准备就绪。如果我们将 DOMContentLoaded 事件处理程序设置在文档加载完成之后, 它永远不会运行。我们希望我们的函数在 DOM 加载完成时执行，无论现在还是以后。

```js
function work() {
  /*...*/
}

if (document.readyState == 'loading') {
  // 仍在加载，等待事件
  document.addEventListener('DOMContentLoaded', work);
} else {
  // DOM 已就绪！
  work();
}
```
