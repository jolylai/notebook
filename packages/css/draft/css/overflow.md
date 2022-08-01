# Overflow 与 滚动条

> PC 端，无论是什么浏览器，默认滚动条均来自`<html>`，而不是`<body>`标签。
> 滚动条会占用容器的可用宽度或高度。

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

## 自定义滚动条样式

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

## 文本溢出点点点效果

```css
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
```

<p class="demo" :class="$style.example">
  这是个段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字
</p>

<style module>
.example {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.box{
  height: 120px;
  border: 1px solid #bbb;
  overflow: auto;
}
.content{
  height: 200px;
  background: #eee;
}
</style>

## 锚点定位

```html
<a href="#">返回顶部></a> <a href="#1">发展历程></a>
<h2 id="1">发展历程</h2>
```

## ff

<div class="demo" :class="$style.box">
  <div :class="$style.content"></div>
  <h4 id="title">底部标题</h4>
</div>
<p><a href="#title">点击测试</a></p>
