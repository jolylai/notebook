# 平行四边形

```css
main {
  position: relative;
  padding: 10px;
  margin: 0 20px;
}
main::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: yellowgreen;
  z-index: -1;
  transform: skew(-45deg);
}
```

  <DemoBlock  demo='css-shape-parallelograms' />

::: tip

- 直接对元素添加 `transform: skew(-45deg);`字也会变形
- 这个技巧不仅对 skew() 变形来说很有用，还适用于其他任何变形样式，当我们想变形一个元素而不想变形它的内容时就可以用到它。
- 这个技巧的关键在于，我们利用伪元素以及定位属性产生了一个方块，然后对伪元素设置样式，并将其放置在其宿主元素的下层。
  :::
