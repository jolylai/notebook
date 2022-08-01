---
title: border
---

# 多重边框

## box-shadow 方案

```css
// 额外模拟出边框所需要占据的空间
margin: 20px;
background: yellowgreen;
box-shadow: 0 0 0 10px blue, 0 0 0 20px orange,
  0 2px 5px 20px rgba(0, 0, 0, 0.6);
```

  <DemoBlock  demo='css-border-multiple' />

::: tip 📝

- [box-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow)
- `box-shadow: 0 0 0 扩张半径 颜色`，即可得到一道实线边框
- 支持逗号分隔法，可以创建任意数量的投影
- box-shadow 是层层叠加的，第一层投影位于最顶
  层，依次类推。
  :::

::: warning 📝

- 投影的行为跟边框不完全一致，因为它不会影响布局，而且也不会
  受到 box-sizing 属性的影响。不过，你还是可以通过内边距或外边
  距（这取决于投影是内嵌和还是外扩的）来额外模拟出边框所需要
  占据的空间。
- 上述方法所创建出的假“边框”出现在元素的外圈。它们并不会响
  应鼠标事件，比如悬停或点击。如果这一点非常重要，你可以给
  box-shadow 属性加上 inset 关键字，来使投影绘制在元素的内圈。
  请注意，此时你需要增加额外的内边距来腾出足够的空隙。
- 只能实现实线边框
  :::

## outline 方案

```css
margin: 20px;
padding: 10px;
background: yellowgreen;
outline: 10px solid orange;
border-radius: 10px;
```

  <DemoBlock  demo='css-border-outline' />

::: tip 📝

- 边框样式灵活，可以实现虚线等效果
- 你可以通过 outline-offset 属性来控制它跟元素边缘之间的间距，这个属性甚至可以接受负值。
  :::

::: warning 📝

- 因为 outline 并不能接受用逗号分隔的多个值。如果我们需要获得更多层的边框，前一
  种方案就是我们唯一的选择了。
- 边框不一定会贴合 border-radius 属性产生的圆角，因此如果元素
  是圆角的，它的描边可能还是直角的<DemoBlock  demo='css-border-outline1' />
  :::
