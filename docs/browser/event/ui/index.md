---
title: 用户界面事件
---

## load 事件

在 window 对象上，load 事件会在整个页面(包括所有外部资源如图片、JavaScript 文件和 CSS 文件)加载完成后触发。

HTML 中直接给`<img>` 元素的 onload 属性指定事件处理程序

```html
<img src="smile.gif" onload="console.log('Image loaded.')" />
```

使用 JavaScript 也可以为图片指定事件处理程序

```js
let image = document.getElementById('myImage');

image.addEventListener('load', event => {
  console.log(event.target.src);
});
```

下载图片并不一定要把`<img>`元素添加到文档，只要给它设置了 `src` 属性就会立即开始下载。

```html
<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0" />
<script>
  function ready() {
    const img = document.getElementById('img');

    // 此时图片已经加载完成
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

  window.addEventListener('load', ready, false);
</script>
```

```js
window.addEventListener('load', () => {
  let image = document.createElement('img');

  image.addEventListener('load', event => {
    console.log(event.target.src);
  });

  document.body.appendChild(image);

  image.src = 'smile.gif';
});
```

可以像 `Image` 对象，只是不能把后者添加到 DOM 树。

```js
window.addEventListener('load', () => {
  let image = new Image();

  image.addEventListener('load', event => {
    console.log(event.target.src);
  });

  image.src = 'smile.gif';
});
```

这里调用 Image 构造函数创建了一个新图片，并给它设置了事件处理程序。有些浏览器会把 Image 对象实现为`<img>` 元素，但并非所有浏览器都如此。所以最好把它们看成是两个东西。

动态创建的`<script>`元素指定事件处理程序

```js
window.addEventListener('load', () => {
  let script = document.createElement('script');
  script.addEventListener('load', event => {
    console.log('Loaded');
  });
  script.src = 'example.js';
  document.body.appendChild(script);
});
```

动态检测样式表是否加载完成

```js
window.addEventListener('load', () => {
  let link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.addEventListener('load', event => {
    console.log('css loaded');
  });
  link.href = 'example.css';
  document.getElementsByTagName('head')[0].appendChild(link);
});
```

## unload 事件

<code src='./demos/Unload.jsx' inline />

unload 事件会在文档卸载完成后触发。unload 事件一般是 在从一个页面导航到另一个页面时触发，最常用于清理引用，以避免内存泄漏。

```js
window.addEventListener('unload', event => {
  console.log('Unloaded!');
});
```

当访问者离开页面时，window 对象上的 unload 事件就会被触发。我们可以在那里做一些不涉及延迟的操作，例如关闭相关的弹出窗口。

假设我们收集有关页面使用情况的数据：鼠标点击，滚动，被查看的页面区域等。当用户要离开的时候，我们希望通过 unload 事件将数据保存到我们的服务器上。

```js
let analyticsData = {
  /* 带有收集的数据的对象 */
};

window.addEventListener('unload', function() {
  navigator.sendBeacon('/analytics', JSON.stringify(analyticsData));
});
```

`navigator.sendBeacon`在后台发送数据，转换到另外一个页面不会有延迟：浏览器离开页面，但仍然在执行 sendBeacon。

## beforeunload 事件

如果访问者触发了离开页面的导航（navigation）或试图关闭窗口，beforeunload 处理程序将要求进行更多确认。用意是给开发者提供阻止页面被卸载的机会。

<code src="./demos/BeforeUnload.jsx" inline />

```js
window.addEventListener('beforeunload', event => {
  let message = "I'm really going to miss you if you go.";
  event.returnValue = message;
  return message;
});
```

将 `event.returnValue` 设置为要在确认框中显示的字符串，并将其作为函数值返回

## resize 事件

<code src="./demos/Resize.jsx" inline />

当浏览器窗口被缩放到新高度或宽度时，会触发 resize 事件。

```js
window.addEventListener('resize', event => {
  console.log('Resized');
});
```

## scroll 事件

```js
window.addEventListener('scroll', event => {
  if (document.compatMode == 'CSS1Compat') {
    console.log(document.documentElement.scrollTop);
  } else {
    console.log(document.body.scrollTop);
  }
});
```
