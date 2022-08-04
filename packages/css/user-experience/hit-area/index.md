# 扩大可点击区域

```css
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}

li {
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  background: yellowgreen;
  margin-right: 10px;
  cursor: pointer;
}

li:first-child {
  border: 10px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3) inset;
}

li:nth-child(2) {
  border: 10px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3) inset, 0 0.1em 0.2em -0.05em rgba(0, 0, 0, 0.5);
}
```

- 使用`border: 10px solid transparent;`扩大点击区域
- 当需要边框时可以用 `box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3) inset;` 模拟一道边框
- 但如果把内嵌投影和（常规的）外部投影组合起来，将会得到一个怪异的效果（如图 2 ），因为**外部投影是绘制在 border box 外部的**。

## 伪元素

```css
li:first-child {
  position: relative;
  margin-top: 10px;
  box-shadow: 0 2px 4px #555;
}

li:first-child::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
}
```

  <DemoBlock  demo='css-experience-hit-area' />

::: tip

- 伪元素同样可以代表其宿主元素来响应鼠标交互。
- 不会干扰其他任何效果,可以把热区设置为任何想要的尺寸、位置或形状，甚至可以脱离元素原有的位置
  :::
