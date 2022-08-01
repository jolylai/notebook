---
title: background
---

## 灵活的背景定位

很多时候，我们想针对容器某个角对背景图片做偏移定位，如右下角。

<code src='./demos/Position.jsx' inline />

### background-position

```css
main {
  // 在不支持 background-position 扩展语法的浏览器中
  // 背景图片会紧贴在左上角（背景图片的默认位置）。
  // bottom 和 right 提供一个合适的回退方案
  background: url('http://csssecrets.io/images/code-pirate.svg') no-repeat
    bottom right #58a;
  background-position: bottom 10px right 20px;

  max-width: 10em;
  min-height: 5em;
  padding: 10px;
  color: #fff;
}
```

```css
/* 规定背景图像的位置 */
background-position: 0% 0%;
background-position: right 0% bottom 0%;
```

top left right bottom center

- 如果您仅规定了一个关键词，那么第二个值将是"center"
- 默认值：0% 0%

x% y%

- 第一个值是水平位置，第二个值是垂直位置
- 左上角是 0% 0%右下角是 100% 100%
- 如果您仅规定了一个值，另一个值将是 50%

xpos ypos

- 第一个值是水平位置，第二个值是垂直位置
- 左上角是 0 0 单位是像素 (0px 0px) 或任何其他的 CSS 单位
- 如果您仅规定了一个值，另一个值将是 50%
- 您可以混合使用 % 和 position 值

### background-origin

```css
background: url('http://csssecrets.io/images/code-pirate.svg') no-repeat bottom
  right #58a;
background-origin: content-box;

max-width: 10em;
min-height: 5em;
padding: 10px;
color: #fff;
```

- background-position 是以 padding box 为准的，这样边框才不会遮住背景图片。
- 视觉效果跟 background-position 完全一样的，但我们的代码变得更加 DRY 了。

### calc()

```css
background: url('http://csssecrets.io/images/code-pirate.svg') no-repeat #58a;
background-position: calc(100% - 10px) calc(100% - 10px);

max-width: 10em;
min-height: 5em;
padding: 10px;
color: #fff;
```

- background-position 是以 padding box 为准的，这样边框才不会遮住背景图片。
- 视觉效果跟 background-position 完全一样的，但我们的代码变得更加 DRY 了。

## 渐变

### 线性渐变

```css
background: linear-gradient(direction, color-stop1, color-stop2, ...);
background: linear-gradient(to bottom right, beige 50%, pink 50%);

/* Using Angles */
background: linear-gradient(angle, color-stop1, color-stop2);
background: linear-gradient(30deg, beige 50%, pink 50%);

/* Repeating a linear-gradient */
```

::: tip
direction

- top to bottom (默认值)
- to top
- to right
- to left
- to bottom right
  :::

## background 中的属性

### background-color

```css
/* 规定要使用的背景颜色 */
background-color: #color;
```

### background-size

```css
/* 规定背景图片的尺寸 */
background-size: length|percentage|cover|contain;
```

::: tip

length

- 设置背景图像的高度和宽度
- 第一个值设置宽度，第二个值设置高度
- 如果只设置一个值，则第二个值会被设置为 "auto"

percentage

- 以父元素的百分比来设置背景图像的宽度和高度
- 第一个值设置宽度，第二个值设置高度
- 如果只设置一个值，则第二个值会被设置为 "auto"

cover

- 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域
- 背景图像的某些部分也许无法显示在背景定位区域中

contain

- 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域
  :::

### background-repeat

```css
/* 规定如何重复背景图像 */
background-repeat: repeat;
```

::: tip

- repeat 默认背景图像将在垂直方向和水平方向重复
- repeat-x 背景图像将在水平方向重复
- repeat-y 背景图像将在垂直方向重复
- no-repeat 背景图像将仅显示一次
- inherit 规定应该从父元素继承 background-repeat 属性的设置
  :::

### background-origin

```css
/* 规定背景图片的定位区域 */
background-origin: padding-box;
```

::: tip

- padding-box 背景图像相对于内边距框来定位
- border-box 背景图像相对于边框盒来定位
- content-box 背景图像相对于内容框来定位
  :::

::: warning
如果背景图像的 background-attachment 属性为 "fixed"，background-origin 没有效果
:::

### background-clip

```css
/* 规定背景的绘制区域 */
background-clip: padding-box;
```

::: tip

- background-origin 和 background-clip 的值
- padding-box 背景图像相对于内边距框来定位
- border-box 背景图像相对于边框盒来定位
- content-box 背景图像相对于内容框来定位
  :::

### background-attachment

```css
/* 规定背景图像是否固定或者随着页面的其余部分滚动 */
background-attachment: none;
```

::: tip

- scroll 默认值背景图像会随着页面其余部分的滚动而移动
- fixed 当页面的其余部分滚动时，背景图像不会移动
- inherit 规定应该从父元素继承 background-attachment 属性的设置
  :::

### background-image

```css
/* 规定要使用的背景图像 */
background-image: none;
```

::: tip

- url('URL') 指向图像的路径
- 渐变(参考下一节)
- none 默认值不显示背景图像
- inherit 规定应该从父元素继承 background-image 属性的设置
  :::

### 初始值

```css
background-color: transparent
background-image: none
background-repeat: repeat
background-attachment: scroll
background-position: 0% 0%
background-origin: padding-box
background-clip: border-box
background-size: auto
```

#### Reference

- [background 属性相关介绍](https://www.zhangxinxu.com/wordpress/2011/05/%E7%BF%BB%E8%AF%91-css3-backgrounds%E7%9B%B8%E5%85%B3%E4%BB%8B%E7%BB%8D/)
