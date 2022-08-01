# 流、元素与基本尺寸

## min-width/max-width 和 min-height/max-height

### **超越！important，超越最大**

- 超越！important

  max-width > !important > 元素中的 style 属性 > css 声明

- 超越最大

```css
.container {
    min-width：1400px;
    max-width: 1200px;
}
```

当 min-width 与 max-width 冲突时，max-width 会被忽略

### 任意高度元素的展开收起动画技术

```css
.element {
  max-height: 0;
  overflow: hidden;
  transition: max-width 0.25s;
}
.element.active {
  max-height: 666px; /* 一个足够大的最大高度值 */
}
```

::: warning
`max-height` 建议使用足够安全的最小值，不然可能出现
**延迟效果**
:::
