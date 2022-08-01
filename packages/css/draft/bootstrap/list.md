# 列表

::: demo

```html
<template>
  <ul class="bs-list">
    <li class="bs-list-item">
      Deserunt exercitation laborum voluptate sunt magna exercitation dolore
    </li>
    <li class="bs-list-item">
      Deserunt exercitation laborum voluptate sunt magna exercitation dolore
    </li>
    <li class="bs-list-item">
      Deserunt exercitation laborum voluptate sunt magna exercitation dolore
    </li>
    <li class="bs-list-item">
      Deserunt exercitation laborum voluptate sunt magna exercitation dolore
    </li>
    <li class="bs-list-item">
      Deserunt exercitation laborum voluptate sunt magna exercitation dolore
    </li>
  </ul>
</template>
<script>
  export default {};
</script>
<style>
  .bs-list {
    list-style: none;
  }
  .bs-list-item {
    position: relative;
    border: 1px solid #ddd;
    padding: 10px 15px;
    margin-bottom: -1px;
  }
  .bs-list-item:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .bs-list-item:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
</style>
```

:::

**Note**

- `ul` 元素默认有 `margin` 和 `padding-left`
- `li` 设置`display: block` 会去除 `li` 前面的小圆点 `list-style`
- `margin-bottom: -1` 去除相邻 `li` 元素的 `border`
