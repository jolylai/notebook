---
group:
  title: 字体印排
  order: 30
---

# font

## font-weight

```css
/* 平常用的最多的 */
font-weight: normal;
font-weight: bold;

/* 相对于父级元素 */
font-weight: lighter;
font-weight: bolder;

/* 字重的精细控制 */
font-weight: 100;
font-weight: 200;
font-weight: 300;
font-weight: 400;
font-weight: 500;
font-weight: 600;
font-weight: 700;
font-weight: 800;
font-weight: 900;
```

::: tip

- 如果使用数值作为 font-weight 属性值，必须是 100 ～ 900 的整百数。不能自创如: `font-weight:550`
- `font-weight:400` 实际上等同于 `font-weight:normal`，`font-weight:700` 等同于 f`ont-weight:bold`。
- lighter 和 bolder 是基于临界点进行解析的，千万不要想当然地认为是根据当前字重上下 100 加加减减后的效果。

:::

### lighter 和 bolder 解析规则表

| 继承的值 | bolder | lighter |
| -------- | :----: | ------: |
| 100      |  400   |     100 |
| 200      |  400   |     100 |
| 300      |  400   |     100 |
| 400      |  700   |     100 |
| 500      |  700   |     100 |
| 600      |  900   |     400 |
| 700      |  900   |     400 |
| 800      |  900   |     700 |
| 900      |  900   |     700 |

## font-style

```css
font-style: normal;
font-style: italic;
font-style: oblique;
```

::: tip

- italic 和 oblique 这两个关键字都表示“斜体”的意思
- italic 是使用当前字体的斜体字体，而 oblique 只是单纯地让文字倾斜。
- 没有斜体字体时 italic 表现会和 oblique 一致，因此，我们在实际开发的时候，几乎没有任何理由需要使用 font-style:oblique。

:::

## font

### 缩写

```
[ [ font-style || font-variant || font-weight ]? font-size [ / line-height ]? font-family ]
```

::: tip

- font-size 和 font-family 后面没有问号，也就是说是必需的，是不可以省略的。
- 是 font 缩写必须要带上 font-family，然而，原本真实继承的 font-family 属性值可能会很长，每次 font 缩写后面都挂一个长长的字体列表，令人很是不悦
  :::

我们可以随便找一个系统根本不存在的字体名占位，如字母 a，或者特殊一点，
用笑脸表情 ☺，然后再设置 font-family:inherit 来重置这个占位字体。

```css
.font {
  font: 30px/30px '☺';
  font-family: inherit;
}
```

### 使用关键字值的 font 属性

```css
font: caption | icon | menu | message-box | small-caption | status-bar;
```

::: tip

- caption：活动窗口标题栏使用的字体。
- icon：包含图标内容所使用的字体，如所有文件夹名称、文件名称、磁盘名称，甚至
  浏览器窗口标题所使用的字体。
- menu：菜单使用的字体，如文件夹菜单。
- message-box：消息盒里面使用的字体。
- small-caption：调色板标题所使用的字体。
- status-bar：窗体状态栏使用的字体。
  :::

::: warning

- 使用关键字作为属性值的时候必须是独立的，不能添加 font-family 或
  者 font-size 之类的，这和 font 属性缩写不是一个路子。如果混用，例如：

```css
.menu {
  font: 14px menu;
}
```

则此时的 menu 是作为自定义的字体名称存在的，而不是表示系统的 menu 菜单字体。
:::

### 让网页的字体跟系统走

```css
html {
  font: menu;
}
body {
  font-size: 16px;
}

html {
  font: small-caption;
}
body {
  font-size: 16px;
}

html {
  font: status-bar;
}
body {
  font-size: 16px;
}
```

# @font face

> @font face 规则支持的 CSS 属性有 font-family、src、font-style、font-weigh、
> unicode-range、font-variant、font-stretch 和 font-feature-settings。

```css
@font-face {
 font-family: 'example';
 src: url(example.ttf);
 font-style: normal;
 font-weight: normal;
 unicode-range: U+0025-00FF;

 font-variant: small-caps;
 font-stretch: expanded;
 font-feature-settings："liga1" on;
}
```

## font-family

```css
@font-face {
  font-family: '$';
  src: url(example.tff);
}
```

::: tip

- `font-family` 可以看成是一个字体变量，名称可以非常随意，就是使用这些稀奇古
  怪的字符或者空格的时候，一定要加引号。
- 但是有一类名称不能随便设置，就是原本系统就有的字体
  名称。
  :::

## src

```css
@font-face {
  font-family: ICON;
  src: url('icon.eot') format('eot');
  src: url('icon.eot?#iefix') format('embedded-opentype'), url('icon.woff2')
      format('woff2') url('icon.woff') format('woff'),
    url('icon.ttf') format('typetrue'), url('icon.svg#icon') format('svg');
  font-weight: normal;
  font-style: normal;
}
```

::: tip

- svg 格式是为了兼容 iOS 4.1 及其之前的版本，考虑到现如今 iOS 的版本数已经翻了一
  番，所以 svg 格式的兼容代码大可舍弃。
- eot 格式是 IE 私有的。注意，目前所有版本的 IE 浏览器都支持 eot 格式，并不是只
  有 IE6 ～ IE8 支持。只是，IE6 ～ IE8 仅支持 eot 这一种字体格式。
- woff 是 web open font format 几个词的首字母简写，是专门为 Web 开发而设计的字体格式，显然是优先使用的字体格式，其字体尺寸更小，加载更快。Android 4.4 开始全面支持。
- woff2 是比 woff 尺寸更小的字体，小得非常明显。因此，Web 开发第一首选字体就
  是 woff2，只是此字体目前仅 Chrome 和 Firefox 支持得比较好。
- ttf 格式作为系统安装字体比较多，Web 开发也能用，就是尺寸大了点儿，优点在于
  老版本 Android 也支持。
  :::

# font-family

- font-family 支持两类属性值，一类是“字体名”，一类是“字体族”。
- 字体族
  - serif：衬线字体。
  - sans-serif：无衬线字体。
  - monospace：等宽字体。
  - cursive：手写字体。
  - fantasy：奇幻字体。
  - system-ui：系统 UI 字体。
- 字体分衬线字体和无衬线字体。所谓衬线字体，通俗讲就是笔画开始、结束的地方有额外
  装饰而且笔画的粗细会有所不同的字体。无衬线字体没有这些额外的装饰，而且笔画的粗细差不多

## 等宽字体

::: demo

```html
<template>
  <main>
    边框类型：<select class="font-family monospaced">
      <option value="solid" selected>———————</option>
      <option value="dashed">-------</option>
      <option value="dotted">·······</option>
    </select>
  </main>
</template>

<style>
  .font-family.monospaced {
    width: 110px;
    font-family: Consolas, Monaco, monospace;
    font-size: 14px;
    letter-spacing: -0.2px;
  }
</style>

<script>
  export default {};
</script>
```

:::

## ch 单位与等宽字体布局

1ch 表示一个 0 字符的宽度

::: demo

```html
<template>
  <main>请输入手机号码： <input class="font-family phoneNo" /></main>
</template>

<style>
  .font-family.phoneNo {
    width: 11ch;
    font-family: Consolas, Monaco, monospace;
    font-size: 14px;
  }
</style>

<script>
  export default {};
</script>
```

:::

# font-size

::: demo

```html
<template>
  <p class="font-size">文字<img src="/images/delete@2x.png" alt="foo" /></p>
</template>

<style>
  .font-size {
    font-size: 14px;
    animation: fontSize 5s infinite alternate ease-in-out;
  }
  .font-size > img {
    width: 16px;
    height: 16px;
    /* 下面的ex实现是为了方便大家对比效果 */
    /* vertical-align: .6ex; */
    vertical-align: 25%;
    position: relative;
    top: 8px;
  }
  @keyframes fontSize {
    to {
      font-size: 60px;
    }
  }
</style>

<script>
  export default {};
</script>
```

:::

## hhh

::: demo

```html
<template>
  <div class="fontSizeEm">中文中文</div>
</template>
<script>
  export default {};
</script>
<style>
  .fontSizeEm {
    font-size: 14px;
    width: 140px;
    line-height: 1;
    background-color: #eee;
  }
</style>
```

:::
