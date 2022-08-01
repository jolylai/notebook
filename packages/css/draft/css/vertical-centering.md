# 垂直居中

## 基于绝对定位

```css
main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

  <DemoBlock  demo='css-layout-vertical-centering-abs' />

::: tip

- translate() 变形函数中使用百分比值时，是以这个元素自身的宽度和高度
  为基准进行换算和移动的
  :::

::: warning

- 我们有时不能选用绝对定位，因为它对整个布局的影响太过强烈。
- 如果需要居中的元素已经在高度上超过了视口，那它的顶部会被视
  口裁切掉。
- 在某些浏览器中，这个方法可能会导致元素的显示有一些模糊，因
  为元素可能被放置在半个像素上。这个问题可以用 transformstyle:
  preserve-3d 来修复，不过这个修复手段也可以认为是一个 hack，而且很难保证它在未来不会出问题。
  :::

## [基于视口单位](http://dabblet.com/gist/bf12b39d8f5da2b6e5b6)

```css
main {
  width: 18em;
  padding: 1em 1.5em;
  margin: 50vh auto 0;
  transform: translateY(-50%);
}
```

::: tip

- vw 是与视口宽度相关的。与常人的直觉不符的是，1vw 实际上表示
  视口宽度的 1%，而不是 100%。
- 与 vw 类似，1vh 表示视口高度的 1%。
- 当视口宽度小于高度时，1vmin 等于 1vw，否则等于 1vh。
- 当视口宽度大于高度时，1vmax 等于 1vw，否则等于 1vh。
- margin 的百分比值是以父元素的宽度作为解析基准的。
  :::

::: warning

- 实用性是相当有限的，因为它只适用于在视口中居中的场景。
  :::

## 基于 Flexbox

> 这是毋庸置疑的最佳解决方案，因为 Flexbox（伸缩盒）是专门针对这类需求所设计的。

```css
main {
  background: yellowgreen;
  height: 200px;

  display: flex;
}
h1 {
  margin: auto;
}
```

<DemoBlock  demo='css-layout-vertical-centering-flex' />
::: tip

- margin: auto 不仅在水平方向上将元素居中，垂直方向上也是如此。
  :::

> Flexbox 的另一个好处在于，它还可以将匿名容器（即没有被标签包裹
> 的文本节点）垂直居中。

```html
<main>Center me, please!</main>
```

```css
main {
  background: yellowgreen;
  height: 200px;

  display: flex;
  align-items: center;
  justify-content: center;
}
```

<DemoBlock  demo='css-layout-vertical-centering-flex-1' />
