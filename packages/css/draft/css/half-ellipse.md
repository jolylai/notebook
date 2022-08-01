# 半椭圆

```css
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
li {
  height: 120px;
  width: 160px;
  margin: 6px;
  background: yellowgreen;
}

li:first-child {
  border-radius: 50% /100% 100% 0 0;
}
li:nth-child(2) {
  border-radius: 0 100% 100% 0 /50%;
}
li:nth-child(3) {
  border-radius: 50% / 0 0 100% 100%;
}
li:nth-child(4) {
  border-radius: 100% 0 0 100%/50%;
}
```

  <DemoBlock  demo='css-shape-half-ellipse' />

::: tip

- border-radius 展开式属性：

  - border-top-left-radius
  - border-top-right-radius
  - border-bottom-right-radius
  - border-bottom-left-radius

- 我们可以向它一次性提供用空格分开的多个值。如果我们传给它四个值，这四个值就会被分别**从左上角开始以顺时针顺序应用到元素的各个拐角**。
- 如果我们提供的值少于四个，则它们会以 CSS 的常规方式重复， 类似于 border-width 的值。如果只提供了三个值，则意味着第四个值与第二值相同；如果只有两个值，则意味着第三个值与第一个相同
- 我们甚至可以为所有四个角提供完全不同的水平和垂直半径，方法是在斜杠前指定 1~4 个值，在斜杠后指定另外 1~4 个值。请注意这两组值是单独展开为四个值的。举例来说，当 border-radius 的值为 10px / 5px 20px 时，其效果相当于 10px 10px 10px 10px / 5px 20px 5px 20px。
  :::
