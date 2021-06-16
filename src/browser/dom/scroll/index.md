---
title: 滚动
---

## HTMLElement.offsetParent

`HTMLElement.offsetParent` 是一个只读属性，返回一个指向最近的（closest，指包含层级上的最近）包含该元素的定位元素。如果没有定位的元素，则 offsetParent 为最近的 table, table cell 或根元素（标准模式下为 html；quirks 模式下为 body）。当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。offsetParent 很有用，因为 offsetTop 和 offsetLeft 都是相对于其内边距边界的。

offsetParent 是最接近的祖先（ancestor），在浏览器渲染期间，它被用于计算坐标。

1. CSS 定位的（position 为 absolute，relative 或 fixed）
2. 或 `<td>`，`<th>`，`<table>`，
3. 或 `<body>`。

有以下几种情况下，offsetParent 的值为 null：

1. 对于未显示的元素（display:none 或者不在文档中）。
2. 对于 `<body>` 与 `<html>`。
3. 对于带有 position:fixed 的元素。

`offsetLeft/offsetTop` 提供相对于 `offsetParent` (padding-box) 左上角的 x/y 坐标。

## offsetLeft/Top

<Alert>
相对于 offsetParent 的 padding-box 计算
</Alert>

- `HTMLElement.offsetTop` 为只读属性，它返回当前元素相对于其 offsetParent 元素的顶部的距离。
- `HTMLElement.offsetLeft` 为只读属性，返回当前元素左上角相对于 offsetParent 节点的左边界偏移的像素值。

对块级元素来说，offsetTop、offsetLeft、offsetWidth 及 offsetHeight 描述了元素相对于 offsetParent 的边界框。

然而，对于可被截断到下一行的行内元素（如 span），offsetTop 和 offsetLeft 描述的是第一个边界框的位置（使用 Element.getClientRects() 来获取其宽度和高度），而 offsetWidth 和 offsetHeight 描述的是边界框的尺寸（使用 Element.getBoundingClientRect 来获取其位置）。因此，使用 offsetLeft、offsetTop、offsetWidth、offsetHeight 来对应 left、top、width 和 height 的一个盒子将不会是文本容器 span 的盒子边界。

```html
<div
  style="width: 300px; border-color:blue;
  border-style:solid; border-width:1;"
>
  <span>Short span. </span>
  <span id="long">Long span that wraps withing this div.</span>
</div>

<div
  id="box"
  style="position: absolute; border-color: red;
  border-width: 1; border-style: solid; z-index: 10"
></div>

<script>
  var box = document.getElementById('box');
  var long = document.getElementById('long');
  //
  // long.offsetLeft这个值就是span的offsetLeft.
  // span是个行内元素，它没有absolute定位，但还是默认offsetParent就是父元素，而不是根
  //

  box.style.left = long.offsetLeft + document.body.scrollLeft + 'px';
  box.style.top = long.offsetTop + document.body.scrollTop + 'px';
  box.style.width = long.offsetWidth + 'px';
  box.style.height = long.offsetHeight + 'px';
</script>
```

## HTMLElement.offsetWidth

`HTMLElement.offsetWidth`是测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及 CSS 设置的宽度(width)的值。(即 `content + scrollbar + padding + border`)

各浏览器的 offsetWidth 可能有所不同，所有需要考虑兼容性

## HTMLElement.offsetHeight

HTMLElement.offsetHeight 是一个只读属性，它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。

通常，元素的 offsetHeight 是一种元素 CSS 高度的衡量标准，包括元素的边框、内边距和元素的水平滚动条（如果存在且渲染的话），不包含:before 或:after 等伪类元素的高度。

对于文档的 body 对象，它包括代替元素的 CSS 高度线性总含量高。浮动元素的向下延伸内容高度是被忽略的。

## 判断一个元素是否在可视区域中

<code src="./demos/ViewPort.jsx" inline />

```js
function isInViewPortOfOne(el) {
  // viewPortHeight 兼容所有浏览器写法
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  const offsetTop = el.offsetTop;

  const scrollTop = document.documentElement.scrollTop;

  const top = offsetTop - scrollTop;

  return top <= viewPortHeight;
}
```

```js
function isInViewPort(element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const { top, right, bottom, left } = element.getBoundingClientRect();

  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}
```

## getBoundingClientRect

Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。

<code src="./demos/Rect.jsx" inline />

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/rect.png)

如果是标准盒子模型即 `box-sizing: content-box`，元素的尺寸等于 width/height + padding + border-width 的总和。

如果 `box-sizing: border-box`，元素的的尺寸等于 width/height。

- [CSSOM 视图模式(CSSOM View Module)相关整理](https://www.zhangxinxu.com/wordpress/2011/09/cssom%e8%a7%86%e5%9b%be%e6%a8%a1%e5%bc%8fcssom-view-module%e7%9b%b8%e5%85%b3%e6%95%b4%e7%90%86%e4%b8%8e%e4%bb%8b%e7%bb%8d/)
