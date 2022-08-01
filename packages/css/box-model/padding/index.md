# padding

- `margin` 属性不同，`padding` 属性是不支持负值的；
- `padding` 支持百分比值，`padding` 百分比值无论是水平方向还是垂直方向均是相对于`父元素宽度`计算的

::: demo

```html
<template>
  <div class="cw-padding-percent"></div>
</template>
<script>
  export default {};
</script>
<style>
  .cw-padding-percent {
    padding: 20% 20%;
    background: skyblue;
  }
</style>
```

:::

## 百分比值

padding 属性是不支持负值的; padding 百分比值无论是水平方向还是垂直方向均是相对于宽度计算的

<icon-menu />

## 内联元素

- 假如是空的内联元素，里面没有任何文字，仅有一个`<span>`标签内联元素的垂直 padding 会让“幽灵空白节点”显现，
  由于内联元素默认的高度完全受 font-size 大小控制，因此，我们只要：设置 `font-size: 0`
  ::: demo

```html
<template>
  <span class="cw-padding-inline"></span>
</template>
<script>
  export default {};
</script>
<style>
  .cw-padding-inline {
    padding: 2% 2%;
    font-size: 0;
    background: skyblue;
  }
</style>
```

:::

# padding

<!-- <template>
    <div class='box'>box</div>
</template>

<style scoped>
.box {
  width: 80px;
  padding: 20px 40px;
  box-sizing: border-box;
}
</style>

只是因为内联元素没有可视宽度和可视高度的说法(clientHeight 和 clientWidth 永远是 0)，垂直方向的行为表现完全受 line-height 和 vertical-align 的影响，视觉上并没有 改变和上一行下一行内容的间距

<template>
  <a class='link'>连接</a>
</template>

<style scoped>
.link {
  padding: 50px;
  background-color: #cd0000;
}
</style> -->

<box-model-padding-pipe />

```html
<a>登录</a> <a>注册</a>
```

```css
a + a::before {
  content: '';
  font-size: 0;
  padding: 10px 3px 1px;
  margin-left: 6px;
  border-left: 1px solid gray;
}
```

## anchor

<template>
<h3><span id="title" class='title'>标题</span></h3>
</template>
<style scoped>
.title {
  padding-top: 50px;
}
</style>

## 百分比值

**`padding` 百分比值无论是水平方向还是垂直方向均是相对于父元素宽度计算的!**

自适应的等比例矩形
<box-model-padding-square />

<box-model-padding-banner />

```html
<div class="banner">
  <img
    src="https://i0.hdslb.com/bfs/archive/d3de829f6cc9ea91875b3e887cacd89f18fcc6c4.png"
  />
</div>
```

```css
.box {
  padding: 10% 50%;
  position: relative;
}
.box > img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
```

## 图形绘制

<box-model-padding-graph />

```css
.icon-menu {
  display: inline-block;
  width: 140px;
  height: 10px;
  padding: 35px 0;
  border-top: 10px solid;
  border-bottom: 10px solid;
  background-color: currentColor;
  background-clip: content-box;
}

.icon-dot {
  display: inline-block;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 10px solid;
  border-radius: 50%;
  background-color: currentColor;
  background-clip: content-box;
}
```
