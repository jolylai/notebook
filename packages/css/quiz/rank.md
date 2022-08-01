# 表单校验

::: demo

```html
<template>
  <ul>
    <li class="qz-rank">
      <span class="qz-rank-tag">No 1</span>
      <img
        class="qz-rank-img"
        src="https://bookcover.yuewen.com/qdbimg/349573/1012237441/180"
        alt="img"
      />
    </li>
    <li class="qz-rank">
      <span class="qz-rank-tag qz-rank-trangle">1</span>
      <img
        class="qz-rank-img"
        src="https://bookcover.yuewen.com/qdbimg/349573/1012237441/180"
        alt="img"
      />
    </li>
  </ul>
</template>
<script>
  export default {};
</script>
<style>
  .qz-rank {
    position: relative;
    float: left;
    margin-right: 8px;
    list-style: none;
  }
  .qz-rank-tag {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #cd0000;
    color: white;
    font-size: 12px;
    padding: 2px 4px;
  }
  .qz-rank-img {
    display: block;
    width: 120px;
    height: 160px;
  }
</style>
```

:::
