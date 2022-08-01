# 切角效果

```css
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
li {
  width: 120px;
  height: 120px;
  margin: 6px;
  box-shadow: 0 4px 6px #eee;
}
li:first-child {
  background: linear-gradient(-45deg, transparent 15px, yellowgreen 0);
}
li:nth-child(2) {
  background: linear-gradient(-45deg, transparent 15px, yellowgreen 0) right, linear-gradient(
        45deg,
        transparent 15px,
        yellowgreen 0
      ) left;
  background-size: 50% 100%;
  background-repeat: no-repeat;
}
li:nth-child(3) {
  background: linear-gradient(135deg, transparent 15px, yellowgreen 0) top left,
    linear-gradient(-135deg, transparent 15px, yellowgreen 0) top right,
    linear-gradient(45deg, transparent 15px, yellowgreen 0) bottom left, linear-gradient(
        -45deg,
        transparent 15px,
        yellowgreen 0
      ) bottom right;
  background-size: 50%;
  background-repeat: no-repeat;
}
```

<DemoBlock  demo='css-shape-bevel-corners-gradients' />

## 圆弧切角

> [radial-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/radial-gradient)

```css
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
li {
  width: 120px;
  height: 120px;
  margin: 6px;
  box-shadow: 0 4px 6px #eee;
}
li:first-child {
  background: radial-gradient(
        circle at top left,
        transparent 15px,
        yellowgreen 0
      ) top left, radial-gradient(
        circle at top right,
        transparent 15px,
        yellowgreen 0
      ) top right,
    radial-gradient(circle at bottom right, transparent 15px, yellowgreen 0) bottom
      right, radial-gradient(
        circle at bottom left,
        transparent 15px,
        yellowgreen 0
      ) bottom left;
  background-size: 50%;
  background-repeat: no-repeat;
}

li:nth-child(2) {
  background: radial-gradient(circle at 50% 0, transparent 15px, yellowgreen 0);
}
```

<DemoBlock  demo='css-shape-scoop-corners' />

## 内联 SVG 与 border-image

```css
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
li {
  width: 120px;
  height: 120px;
  margin: 6px;
  box-shadow: 0 4px 6px #eee;
}
li:first-child {
  box-sizing: border-box;
  border: 15px solid transparent;
  /* 这并不表示 1 像素；它所对应的是SVG 文件的坐标系统（因此不需要单位）。 */
  border-image: 1
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" fill="%2358a"><polygon points="0,1 1,0 2,0 3,1 3,2 2,3 1,3 0,2"/></svg>');
}
li:nth-child(2) {
  box-sizing: border-box;
  border: 15px solid transparent;
  /* fill 关键字——这样它就不会丢掉 SVG中央的那个切片了。 */
  border-image: 1 fill
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" fill="%2358a"><polygon points="0,1 1,0 2,0 3,1 3,2 2,3 1,3 0,2"/></svg>');
}
li:nth-child(3) {
  box-sizing: border-box;
  background: yellowgreen;
  background-clip: padding-box;
  border: 15px solid transparent;
  border-image: 1
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" fill="%2358a"><polygon points="0,1 1,0 2,0 3,1 3,2 2,3 1,3 0,2"/></svg>');
}

li:nth-child(4) {
  box-sizing: border-box;
  background: yellowgreen;
  /* background-clip: padding-box; */
  border: 15px solid transparent;
  border-image: 1
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" fill="%2358a"><polygon points="0,1 1,0 2,0 3,1 3,2 2,3 1,3 0,2"/></svg>');
  animation: coner 5s infinite linear;
}

@keyframes coner {
  to {
    border-width: 30px;
  }
}
```

<DemoBlock  demo='css-shape-bevel-corners' />

::: tip
要么提供一个背景色，
要么给 border-image 属性值加上 fill 关键字——这样它就不会丢掉 SVG
中央的那个切片了。在这个例子中，我们决定指定一个背景色，因为它还可
以发挥回退的作用。
:::

## 裁切路径

```css
main {
  background: #58a;
  clip-path: polygon(
    20px 0,
    calc(100% - 20px) 0,
    100% 20px,
    100% calc(100% - 20px),
    calc(100% - 20px) 100%,
    20px 100%,
    0 calc(100% - 20px),
    0 20px
  );

  width: 120px;
  height: 120px;
  margin: 6px;
}
```

<DemoBlock  demo='css-shape-bevel-corners-clipped' />

::: tip

- 它是本节所述的所有纯 CSS 方案中最不 DRY 的，因为如果要改动切角的尺寸，我们需要修改八处！不过另一方面，改变背景倒是变得比较方便，只需修改一处即可。
- 我们可以使用任意类型的背景，甚至可以对替换元素（比如图片）进行裁切。
- 是当内边距不够宽时，它会裁切掉文本，因为它只能对元素做统一的裁切，并不能区分元素的各个部分。
  :::
