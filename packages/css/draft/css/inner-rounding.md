# 边框内圆角

> box-shadow，outline，“多重边框”

```css
height: 120px;
padding: 10px;
background: yellowgreen;
margin: 10px;

outline: 10px solid orange;
border-radius: 10px;
box-shadow: 0 0 0 5px orange;
```

  <DemoBlock  demo='css-background-inner-rounding' />

::: tip

- 扩张半径需要比描边的宽度值小，但它同时又要比 (√2 −1)r 大（这里的 r 表示 border-radius）。你可以直接使用圆角半径的一半，因为 √2-1 < 0.5 。
  :::
