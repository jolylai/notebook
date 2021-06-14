---
title: 滚动
---

## getBoundingClientRect

Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。

<code src="./demos/Rect.jsx" />

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/rect.png)

如果是标准盒子模型即 `box-sizing: content-box`，元素的尺寸等于 width/height + padding + border-width 的总和。

如果 `box-sizing: border-box`，元素的的尺寸等于 width/height。
