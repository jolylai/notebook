# 按钮

::: demo

```html
<template>
  <div>
    <button class="bs-btn" type="button">
      Button
    </button>
    <button disabled class="bs-btn" type="button">
      Button
    </button>
  </div>
</template>
<script>
  export default {};
</script>
<style>
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

  .bs-btn:hover:not(:focus) {
    border-color: #b5b5b5;
    color: #363636;
  }

  .bs-btn:focus {
    outline: 0;
    border-color: #3273dc;
    color: #363636;
  }

  .bs-btn:focus:not(:active) {
    box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
  }

  .bs-btn:active {
    border-color: #4a4a4a;
    color: #363636;
  }

  .bs-btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
</style>
```

:::

## 默认样式

- 默认边框 `border: 1px solid rgb(216, 216, 216)`
- 聚焦时会有 outline

## 状态

1.普通状态

2，鼠标 hover 状态

鼠标移入但没有聚焦才改变状态

```css
.bs-btn:hover:not(:focus) {
  border-color: #b5b5b5;
  color: #363636;
}
```

3.active 点击状态

```css
.bs-btn:active {
  border-color: #4a4a4a;
  color: #363636;
}
```

4.focus 取得焦点状态

```css
.bs-btn:focus {
  outline: 0;
  border-color: #3273dc;
  color: #363636;
}

.bs-btn:focus:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}
```

disabled

## 按钮图案

::: demo

```html
<template>
  <div>
    <button class="bs-btn bs-btn-default" type="button">
      Button
      <span class="bs-caret"></span>
    </button>
  </div>
</template>
<script>
  export default {};
</script>
<style>
  .bs-caret {
    display: inline-block;
    vertical-align: middle;
    height: 0;
    width: 0;
    border-top: 4px dashed;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
  }
</style>
```

:::

### 倒三角

**思考**：为什么能用以下几行 css 就能画一个倒三角

```css
.bs-caret {
  height: 0;
  width: 0;
  border-top: 4px dashed;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}
```

::: demo

```html
<template>
  <ul class="bs-border-container">
    <li class="bs-border"></li>
    <li class="bs-border bs-border-1"></li>
    <li class="bs-border bs-border-2"></li>
    <li class="bs-border bs-border-3"></li>
  </ul>
</template>
<script>
  export default {};
</script>
<style>
  .bs-border-container > li {
    display: inline-block;
  }
  .bs-border {
    width: 60px;
    height: 60px;
    border-top: 12px solid;
    border-right: 12px solid skyblue;
    border-bottom: 12px solid;
    border-left: 12px solid skyblue;
  }
  .bs-border-1 {
    width: 0;
    height: 0;
  }
  .bs-border-2 {
    width: 0;
    height: 0;
    border-bottom-width: 0;
  }
  .bs-border-3 {
    width: 0;
    height: 0;
    border-bottom-width: 0;
    border-right-color: transparent;
    border-left-color: transparent;
  }
</style>
```

:::

画一个 60px 的正方形，分别设置四个方向的边框，并用不同的颜色区分相邻的边框，这时我们得到第一个图形，可以看出其实边框是由四个矩形组成

```css
.bs-border {
  width: 60px;
  height: 60px;
  border-top: 12px solid;
  border-right: 12px solid skyblue;
  border-bottom: 12px solid;
  border-left: 12px solid skyblue;
}
```

将宽高都设置为 0，这时就能得到一个由四个三角形拼成的一个正方形，如第二个图形

```css
.bs-border {
  width: 0;
  height: 0;
  border-top: 12px solid;
  border-right: 12px solid skyblue;
  border-bottom: 12px solid;
  border-left: 12px solid skyblue;
}
```

去除下边框,这时我们得到第三个图形

```css
.bs-border {
  width: 0;
  height: 0;
  border-top: 12px solid;
  border-right: 12px solid skyblue;
  border-left: 12px solid skyblue;
}
```

把左右边框的颜色设置为透明，这时就能得到我们想要的倒三角

```css
.bs-border {
  width: 0;
  height: 0;
  border-top: 12px solid;
  border-right: 12px solid transparent;
  border-left: 12px solid transparent;
}
```

**思考**：用 css 画出另外三个方向的三角形
