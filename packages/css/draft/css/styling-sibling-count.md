# 根据兄弟元素的数量来设置样式

### 命中只有一个列表项

```css
li:only-child {
  /* 只有一个列表项时的样式 */
}

li:first-child:nth-last-child(1) {
  /* 相当于li:only-child */
}
```

  <DemoBlock  demo='css-layout-styling-sibling-count-1' />

```css
li:first-child:nth-last-child(4) {
  /* 当列表正好包含四项时，命中第一个列表项 */
}

li:first-child:nth-last-child(4) ~ li {
  /* 当列表正好包含四项时，命中后三个列表项 */
}

li:first-child:nth-last-child(4),
li:first-child:nth-last-child(4) ~ li {
  /* 当列表正好包含四项时，命中所有列表项 */
}
```

  <DemoBlock  demo='css-layout-styling-sibling-count-2' />

```css
li:first-child:nth-last-child(n + 4),
li:first-child:nth-last-child(n + 4) ~ li {
  /* 当列表至少包含四项时，命中所有列表项 */
}

li:first-child:nth-last-child(-n + 4),
li:first-child:nth-last-child(-n + 4) ~ li {
  /* 当列表最多包含四项时，命中所有列表项 */
}
```

  <DemoBlock  demo='css-layout-styling-sibling-count-3' />
