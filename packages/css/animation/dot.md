# 打点动画

::: demo

```html
<template>
  <dot class="cw-dot-animation">...</dot>
</template>
<script>
  export default {};
</script>
<style>
  .cw-dot-animation {
    display: inline-block;
    height: 1em;
    line-height: 1;
    overflow: hidden;
    text-align: left;
    vertical-align: -0.25em;
  }
  .cw-dot-animation:before {
    display: block;
    content: '...\A..\A.';
    white-space: pre-wrap;
    animation: cw-dot 3s infinite step-start both;
  }
  @keyframes cw-dot {
    33% {
      transform: translateY(-2em);
    }
    66% {
      transform: translateY(-1em);
    }
  }
</style>
```

:::
