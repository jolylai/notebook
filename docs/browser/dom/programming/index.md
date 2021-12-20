---
title: DOM 编程
---

很多时候，操作 DOM 是很直观的。通过 HTML 代码能实现的，也一样能通过 JavaScript 实现。但 有时候，DOM 也没有看起来那么简单。浏览器能力的参差不齐和各种问题，也会导致 DOM 的某些方 面会复杂一些。

## 动态脚本

**动态脚本**就是在页面初始加载时不存在，之后又通过 DOM 包含的脚本。

```js
function loadScript(path) {
  const script = document.createElement('script');
  script.src = path;
  document.body.appendChild(script);
}
```

在上面最后一行把`<script>` 元素添加到页面之前，是不会开始下载外部文件的。当然也可以把它添加到<head>元素，同样可以实 现动态脚本加载。

## 动态样式

CSS 样式在 HTML 页面中可以通过两个元素加载。`<link>`元素用于包含 CSS 外部文件，而`<style>` 元素用于添加嵌入样式。

```html
<link rel="stylesheet" type="text/css" href="styles.css" />
```

使用 Dom 编程

```js
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'styles.css';
let head = document.getElementsByTagName('head')[0];
head.appendChild(link);
```

应该把`<link>`元素添加到`<head>`元素而不是 `<body>`元素，这样才能保证所有浏览器都能正常运行。

```js
function loadCss(href) {
  let css = document.querySelector(`link[href="${href}"]`);

  if (css) return css;

  css = document.createElement('link');
  css.rel = 'stylesheet';
  css.type = 'text/css';
  css.href = href;

  css.setAttribute('data-status', 'loading');

  const handler = event => {
    const cssStatus = event.type === 'load' ? 'ready' : 'error';
    css.setAttribute('data-status', cssStatus);
  };

  css.addEventListener('load', handler, false);
  css.addEventListener('error', handler, false);

  document.body.appendChild(css);

  return css;
}
```
