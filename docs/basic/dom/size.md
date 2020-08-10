# 宽高属性

[HTML 的各种宽高](https://www.jianshu.com/p/60332df38393)

## documentElement

`Document.documentElement` 是一个会返回文档对象（document）的根元素的只读属性（如 HTML 文档的 `<html>` 元素）。

```js
const rootElement = document.documentElement;
```

## client

需要考虑到滚动条的宽度

### HTMLElement.clientWidth

`HTMLElement.clientWidth` 属性表示元素的内部宽度，以像素计。该属性包括内边距，但不包括垂直滚动条（如果有）、边框和外边距（即 `content + padding`）。

如果出现滚动条，滚动条会遮盖元素的宽高，那么该属性就是其本来宽高减去滚动条的宽高

### HTMLElement.clientHeight

`HTMLElement.clientHeight` 属性表示元素的内部高度，以像素计。该属性包括内边距，但不包括垂直滚动条（如果有）、边框和外边距（即 `content + padding`）。

这一对属性是用来读取元素的 border 的宽度和高度的

### HTMLElement.clientLeft

表示一个元素的左边框的宽度，以像素表示。如果元素的文本方向是从右向左（RTL, right-to-left），并且由于内容溢出导致左边出现了一个垂直滚动条，则该属性包括滚动条的宽度。clientLeft 不包括左外边距和左内边距。clientLeft 是只读的。

```js
const body = document.body;

// 即 CSS 中 border-left 的值
const borderLeft = body.clientLeft; // -> 20
```

### HTMLElement.clientTop

一个元素顶部边框的宽度（以像素表示）。不包括顶部外边距或内边距。clientTop 是只读的。

```js
const body = document.body;

// 即 CSS 中 border-top 的值
const borderLeft = body.clientTop; // -> 20
```

## offset

### HTMLElement.offsetWidth

`HTMLElement.offsetWidth`是测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及 CSS 设置的宽度(width)的值。(即 `content + scrollbar + padding + border`)

各浏览器的 offsetWidth 可能有所不同，所有需要考虑兼容性

### HTMLElement.offsetHeight

HTMLElement.offsetHeight 是一个只读属性，它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。

通常，元素的 offsetHeight 是一种元素 CSS 高度的衡量标准，包括元素的边框、内边距和元素的水平滚动条（如果存在且渲染的话），不包含:before 或:after 等伪类元素的高度。

对于文档的 body 对象，它包括代替元素的 CSS 高度线性总含量高。浮动元素的向下延伸内容高度是被忽略的。

### HTMLElement.offsetParent

`HTMLElement.offsetParent` 是一个只读属性，返回一个指向最近的（closest，指包含层级上的最近）包含该元素的定位元素。如果没有定位的元素，则 offsetParent 为最近的 table, table cell 或根元素（标准模式下为 html；quirks 模式下为 body）。当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。offsetParent 很有用，因为 offsetTop 和 offsetLeft 都是相对于其内边距边界的。

### HTMLElement.offsetTop

`HTMLElement.offsetTop` 为只读属性，它返回当前元素相对于其 offsetParent 元素的顶部的距离。

### HTMLElement.offsetLeft

`HTMLElement.offsetLeft` 是一个只读属性，返回当前元素左上角相对于 HTMLElement.offsetParent 节点的左边界偏移的像素值。

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

## scroll

### Element.scrollWidth

`Element.scrollWidth` 是只读属性，表示元素内容的宽度，包括由于滚动而未显示在屏幕中内容

scrollWidth 值等于元素在不使用水平滚动条的情况下适合视口中的所有内容所需的最小宽度。 宽度的测量方式与 clientWidth 相同：它包含元素的内边距，但不包括边框，外边距或垂直滚动条（如果存在）。 它还可以包括伪元素的宽度，例如::before 或::after。 如果元素的内容可以适合而不需要水平滚动条，则其 scrollWidth 等于 clientWidth

### Element.scrollHeight

`Element.scrollHeight` 这个只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。

scrollHeight 的值等于该元素在不使用滚动条的情况下为了适应视口中所用内容所需的最小高度。 没有垂直滚动条的情况下，scrollHeight 值与元素视图填充所有内容所需要的最小值 clientHeight 相同。包括元素的 padding，但不包括元素的 border 和 margin。scrollHeight 也包括 ::before 和 ::after 这样的伪元素。

### Element.scrollTop

`Element.scrollTop` 属性可以获取或设置一个元素的内容垂直滚动的像素数。

一个元素的 scrollTop 值是这个元素的顶部到视口可见内容（的顶部）的距离的度量。当一个元素的内容没有产生垂直方向的滚动条，那么它的 scrollTop 值为 0。

### Element.scrollLeft

`Element.scrollLeft` 属性可以读取或设置元素滚动条到元素左边的距离。

注意如果这个元素的内容排列方向（direction） 是 rtl (right-to-left) ，那么滚动条会位于最右侧（内容开始处），并且 scrollLeft 值为 0。此时，当你从右到左拖动滚动条时，scrollLeft 会从 0 变为负数（这个特性在 chrome 浏览器中不存在）。
