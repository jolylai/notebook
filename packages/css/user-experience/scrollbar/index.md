---
group:
  title: 用户体验
  order: 40
---

## 滚动条

- PC 端，无论是什么浏览器，默认滚动条均来自`<html>`，而不是`<body>`标签。
- 滚动条会占用容器的可用宽度或高度。

## 页面滚动条不发生晃动

```html
<a href="#1">发展历程></a>
```

```css
html {
  overflow-y: scroll; /* for IE8 */
}
:root {
  overflow-y: auto;
  overflow-x: hidden;
}
:root body {
  position: absolute;
}
body {
  width: 100vw;
  overflow: hidden;
}
```

### 自定义滚动条样式

- 整体部分，::-webkit-scrollbar；
- 两端按钮，::-webkit-scrollbar-button；
- 外层轨道，::-webkit-scrollbar-track；
- 内层轨道，::-webkit-scrollbar-track-piece；
- 滚动滑块，::-webkit-scrollbar-thumb；
- 边角，::-webkit-scrollbar-corner。

```css
::-webkit-scrollbar {
  /* 血槽宽度 */
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  /* 拖动条 */
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
}
::-webkit-scrollbar-track {
  /* 背景槽 */
  background-color: #ddd;
  border-radius: 6px;
}
```
