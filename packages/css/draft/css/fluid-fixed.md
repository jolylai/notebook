# 满幅的背景，定宽的内容

> [calc](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc)

```css
main {
  padding: 1em;
  padding: 1em calc(50% - 300px);
  background: yellowgreen;
}
```

  <DemoBlock  demo='css-layout-fluid-fixed' />

::: tip
当内边距是 50% - 300px 时，只可能给内容留出 600px（2×300px）的可用空间
:::
