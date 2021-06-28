---
title: 脚本
---

当浏览器加载 HTML 时遇到`<script>...</script>` 标签，浏览器就不能继续构建 DOM。它必须立刻执行此脚本。对于外部脚本 `<script src="..."></script>` 也是一样的：浏览器必须等脚本下载完，并执行结束，之后才能继续处理剩余的页面。

```html
<p>...content before script...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- This isn't visible until the script loads -->
<p>...content after script...</p>
```

这会导致两个重要的问题：

- 脚本不能访问到位于它们下面的 DOM 元素，因此，脚本无法给它们添加处理程序等。
- 如果页面顶部有一个笨重的脚本，它会“阻塞页面”。在该脚本下载并执行结束前，用户都不能看到页面内容

所以通常我们可以把脚本放在页面底部。此时，它可以访问到它上面的元素，并且不会阻塞页面显示内容：

```html
<body>
  ...all content is above the script...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

但是这种解决方案远非完美。例如，浏览器只有在下载了完整的 HTML 文档之后才会注意到该脚本（并且可以开始下载它）。对于长的 HTML 文档来说，这样可能会造成明显的延迟。

## 推迟执行脚本

`<script>`元素定义了一个叫 defer 的属性。这个属性表示脚本在执行的时候不会改 变页面的结构。也就是说，脚本会被延迟到整个页面都解析完毕后再运行。因此，在`<script>`元素上 设置 defer 属性，相当于告诉浏览器立即下载，但延迟执行。

defer 特性告诉浏览器不要等待脚本。相反，浏览器将继续处理 HTML，构建 DOM。脚本会“在后台”下载，然后等 DOM 构建完成后，脚本才会执行。

具有 defer 特性的脚本不会阻塞页面。

```html
<p>...content before script...</p>

<script
  defer
  src="https://javascript.info/article/script-async-defer/long.js?speed=1"
></script>

<!-- 立即可见 -->
<p>...content after script...</p>
```

**具有 defer 特性的脚本总是要等到 DOM 解析完毕，但在 DOMContentLoaded 事件之前执行。**

```html
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () =>
    alert('DOM ready after defer!'),
  );
</script>

<script
  defer
  src="https://javascript.info/article/script-async-defer/long.js?speed=1"
></script>

<p>...content after scripts...</p>
```

**具有 defer 特性的脚本保持其相对顺序，就像常规脚本一样。**

假设，我们有两个具有 defer 特性的脚本：long.js 在前，small.js 在后。

```html
<script
  defer
  src="https://javascript.info/article/script-async-defer/long.js"
></script>
<script
  defer
  src="https://javascript.info/article/script-async-defer/small.js"
></script>
```

浏览器扫描页面寻找脚本，然后并行下载它们，以提高性能。因此，在上面的示例中，两个脚本是并行下载的。small.js 可能会先下载完成。

## 异步执行脚本

异步脚本保证会在页面的 load 事件前执行，但可能会在 DOMContentLoaded 之前或之后。

## 动态脚本

使用 JavaScript 动态地创建一个脚本，并将其附加（append）到文档（document）中

```js
let script = document.createElement('script');
script.src = '/article/script-async-defer/long.js';
document.body.append(script); // (*)
```

当脚本被附加到文档时，脚本就会立即开始加载。**默认情况下，动态脚本的行为是“异步”的。**

```js
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// long.js 先执行，因为代码中设置了 async=false
loadScript('/article/script-async-defer/long.js');
loadScript('/article/script-async-defer/small.js');
```
