# 输入框

::: demo

```html
<template>
  <div>
    <div class="bs-input-group">
      <span class="bs-input-group-addon" id="basic-addon1">@</span>
      <input
        type="text"
        class="bs-form-control"
        placeholder="Username"
        aria-describedby="basic-addon1"
      />
    </div>
  </div>
</template>
<script>
  export default {};
</script>
<style>
  .bs-input-group {
    display: table;
    border-collapse: separate;
  }
  .bs-input-group-addon {
    display: table-cell;
    width: 1%;

    /* 边框 */
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px 12px;
    /* 垂直居中 */
    font-size: 0.875em;
    line-height: 1;
    /* 水平居中不换行 */
    text-align: center;
    white-space: nowrap;

    background: #eee;

    border-collapse: separate;
  }
  .bs-form-control {
    display: table-cell;
    width: 100%;
    box-sizing: border-box;

    font-size: 0.875em;
    min-height: calc(1.5em + 0.75rem + 2px);
    /* 边框 */
    border: 1px solid #ccc;
    border-radius: 0.25em;

    padding: 0.375em 0.75em;

    line-height: 1.428571429;

    border-collapse: separate;
  }

  /* 去除圆角 */
  .bs-input-group-addon:first-child {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .bs-form-control:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .bs-form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #8bbafe;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  }
</style>
```

:::

## 布局

```css
.bs-input-group {
  display: table;
}
.bs-input-group-addon {
  display: table-cell;
  width: 1%;
}
.bs-form-control {
  display: table-cell;
  width: 100%;

  /* input 默认有border和 padding 如果设置 border-box input 会突出容器 */
  box-sizing: border-box;
}
```

## 合并边框

这里是将一边的边框设置为 0

```css
.bs-input-group-addon:first-child {
  border-right: 0;
}
```

**思考**： 能不能想 list 列表中使用负值的`margin`来合并边框呢？

答案是不能的，这里使用了 `display: table-cell` 来布局，所以设置 `margin` 值是没有效果的

## 聚焦时的样式
