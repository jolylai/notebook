# 进度条

> background-image, background-position, float

[antd progress](https://ant.design/components/progress-cn/)

## 基础

::: demo

```html
<template>
  <div>
    <div class="bs-progress">
      <div
        class="bs-progress-bar"
        role="progressbar"
        aria-valuenow="60"
        aria-valuemin="0"
        aria-valuemax="100"
        style="min-width: 2em;"
      >
        0%
      </div>
    </div>
    <div class="bs-progress">
      <div
        class="bs-progress-bar"
        role="progressbar"
        aria-valuenow="60"
        aria-valuemin="0"
        aria-valuemax="100"
        style="width: 20%;"
      >
        20%
      </div>
      <div
        class="bs-progress-bar bs-progress-bar-success"
        role="progressbar"
        aria-valuenow="60"
        aria-valuemin="0"
        aria-valuemax="100"
        style="width: 60%;"
      >
        60%
      </div>
    </div>
  </div>
</template>
<script>
  export default {};
</script>
<style>
  .bs-progress {
    height: 20px;
    background-color: #f5f5f5;
    border-radius: 4px;
    overflow: hidden;

    /* 凹陷效果 */
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);

    margin-bottom: 20px;
  }
  .bs-progress-bar {
    float: left;
    background-color: #337ab7;

    /* 高度充满父容器 */
    height: 100%;

    /* 文字 */
    color: #fff;
    font-size: 12px;

    /* 水平居中 */
    text-align: center;

    /* 垂直居中 */
    line-height: 20px;
  }

  .bs-progress-bar-success {
    background-color: #5cb85c;
  }
</style>
```

:::

在展示很低的百分比时，如果需要让文本提示能够清晰可见，可以为进度条设置 min-width 属性。

### Float

浮动元素的特性

- 包裹性;
- 块状化并格式化上下文;
- 破坏文档流;
- 没有任何 margin 合并;

```css
.bs-progress-bar {
  float: left;
}
```

这里充分利用了浮动的包裹性，浮动元素的宽度随着内容的增加而增加

文字水平垂直居中

## 条纹效果

::: demo

```html
<template>
  <div>
    <div class="bs-progress">
      <div
        class="bs-progress-bar bs-progress-bar-striped"
        role="progressbar"
        aria-valuenow="60"
        aria-valuemin="0"
        aria-valuemax="100"
        style="width: 60%;"
      ></div>
    </div>
  </div>
</template>
<script>
  export default {};
</script>
<style>
  .bs-progress-bar-striped {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
  }
</style>
```

:::

### 线性渐变

为什么 `background-size` 是 `40px 40px;`

## 动画效果

::: demo

```html
<template>
  <div>
    <div class="bs-progress">
      <div
        class="bs-progress-bar bs-progress-bar-striped bs-progress-bar-active"
        role="progressbar"
        aria-valuenow="60"
        aria-valuemin="0"
        aria-valuemax="100"
        style="width: 60%;"
      ></div>
    </div>
  </div>
</template>
<script>
  export default {};
</script>
<style>
  .bs-progress-bar-active {
    animation: progress-bar-stripes 1s linear infinite;
  }
  @keyframes progress-bar-stripes {
    0% {
      background-position-x: 40px;
    }
  }
</style>
```

:::
