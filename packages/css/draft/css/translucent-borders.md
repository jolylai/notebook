# 半透明边框

::: tip 背景知识

- 背景知识：:point_right: [background-clip](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)
- 默认情况下，
  背景会延伸到边框所在的区域下层。
  :::

```css
border: 10px solid hsla(0, 0%, 100%, 0.5);
background: #be4141;
background-clip: padding-box;
```

<DemoBlock demo='css-border-translucent' />
