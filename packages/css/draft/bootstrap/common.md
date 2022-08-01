# 通用样式

## 过渡

> [transitions](https://cssreference.io/transitions/)

## 动画

> [animations](https://cssreference.io/animations/)

## 隐藏元素

元素在页面上不显示，且不占据页面的空间

::: demo

```html
<template>
  <span class="bs-sr-only">60% Complete</span>
</template>
<script>
  export default {};
</script>
<style>
  .bs-sr-only {
    /* 脱离文档流 不占用文档空间 */
    position: absolute;
    /* 裁切 */
    clip: rect(0, 0, 0, 0);

    height: 1px;
    width: 1px;
    overflow: hidden;
    padding: 0;
    border: 0;
  }
</style>
```

:::

```css
.sr-only,
.sr-only-focusable:not(:focus) {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
```
