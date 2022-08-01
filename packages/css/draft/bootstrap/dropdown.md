# 下拉菜单

::: demo

```html
<template>
  <div>
    <ul class="bs-dropdown">
      <button class="bs-btn" type="button">
        Dropdown
        <span class="caret"></span>
      </button>
      <ul class="bs-dropdown-menu">
        <li><a href="#">Action</a></li>
        <li><a href="#">Another action</a></li>
        <li><a href="#">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a href="#">Separated link</a></li>
      </ul>
    </ul>
    <>
  </div>
</template>
<script>
  export default {};
</script>
<style>
  .bs-dropdown {
    position: relative;
  }
  .bs-dropdown > .bs-btn {
    float: left;
  }

  .bs-dropdown-menu {
    /* position: static;
    top: 100%;
    left: 0;
    z-index: 1000; */
    display: block;
    margin-bottom: 5px;
    float: left;
    clear: left;

    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25em;
    margin-top: 0.125em;

    padding: 0.375em 0;
    list-style: none;
    min-width: 160px;
  }

  .bs-btn {
    box-sizing: border-box;
    padding: 0.375em 0.75em;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    /* 用户不可选中文字 */
    user-select: none;

    /* 重置默认边框 */
    border-color: #dbdbdb;
    border-width: 1px;
    background-color: #fff;
    border-radius: 0.375em;

    /* 过渡 */
    transition: all 0.2s;
  }
</style>
```

:::
