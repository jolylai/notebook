---
title: margin
order: 3
---

## margin 合并

**块级元素** 的 **上外边距(margin-top)** 与 **下外边距(margin-bottom)** 有时会合并为单个外边距，这样的现象称为 **“margin 合并”**。

1. **块级元素**，但不包括浮动和绝对定位元素，尽管浮动和绝对定位可以让元素块状化。
2. **只发生在垂直方向**，需要注意的是，这种说法在不考虑 `writing-mode` 的情况下才是正确的，严格来讲，应该是 **只发生在和当前文档流方向的相垂直的方向上** 。由于默认文档流 是水平流，因此发生 margin 合并的就是垂直方向。

### 合并的 3 种场景

1.相邻兄弟元素 margin 合并。这是 margin 合并中最常见、最基本的

<p>eligendi sapiente aut</p>
<p>dolore occaecati deserunt</p>

则第一行和第二行之间的间距还是 1em，因为第一行的 margin-bottom 和第二行的 margin-top 合并在一起了，并非上下相加。

2.父级和第一个/最后一个子元素。

<code src='./demos/Hero.jsx' inline />

3.空块级元素的 margin 合并。

```html
<div class="father">
  <div class="son"></div>
</div>
```

```css
.father {
  overflow: hidden;
}
.son {
  margin: 1em 0;
}
```

结果，此时.father 所在的这个父级`<div>`元素高度仅仅是 1em，因为.son 这个空`<div>`元 素的 margin-top 和 margin-bottom 合并在一起了。

## 两栏自适应布局

<box-model-margin-comment />

```html
<div class="comment">
  <img
    class="comment-avatar"
    src="https://tailwindcss.com/_next/static/media/jucy-beef-burger.032c3c262707ccb9636fb3c909efeaf6.jpg"
  />
  <div class="comment-content">
    We supply a series of design principles, practical patterns and high quality
    design resources (Sketch and Axure), to help people create their product
    prototypes beautifully and efficiently.
  </div>
</div>
```

```css
.comment {
  overflow: hidden;
}

.comment-avatar {
  width: 80px;
  height: 80px;
  border-radius: 8px;

  float: left;
}

.comment-content {
  margin-left: 100px;
}
```

文字内容就会根据`.comment` 盒子的宽度变化而自动排列，形成自适应布局效果，无论盒子 是 200 像素还是 400 像素，布局依然良好，不会像纯浮动布局那样发生错位。
<box-model-margin-comment-right />

**图片右侧定位**

只要图片的左浮动改成右浮动，文字内容的左 margin 改成右 margin 即可。

```css
.comment {
  overflow: hidden;
}

.comment-avatar {
  width: 80px;
  height: 80px;
  border-radius: 8px;

  float: right;
}

.comment-content {
  margin-right: 100px;
}
```

HTML 和上面的左侧定位效果一模一样，最终实现的也是一个效果良好的自适应布局。然 而，这里的实现有一点瑕疵，那就是元素在 DOM 文档流中的前后顺序和视觉表现上的前后顺 序不一致。什么意思呢?我们这里的图片是右浮动，视觉表现在.box 的右侧，但是图片相关 的 HTML 代码却在前面。这个相反的位置关系有时候会给其他同事造成一些困难。所以，如果 想要实现顺序完美一致的自适应效果，可以借助 margin 负值定位实现。

<box-model-margin-comment-negative />

```html
<div class="comment">
  <div class="comment-content">
    <p>
      We supply a series of design principles, practical patterns and high
      quality design resources (Sketch and Axure), to help people create their
      product prototypes beautifully and efficiently.
    </p>
  </div>
  <img
    class="comment-avatar"
    src="https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/jucy-beef-burger.jpg"
  />
</div>
```

```css
.comment {
  overflow: hidden;
}

.comment-content {
  width: 100%;
  float: left;
}

.comment-content p {
  margin: 0;
  margin-right: 100px;
}

.comment-avatar {
  width: 80px;
  height: 80px;
  border-radius: 8px;

  float: left;
  margin-left: -80px;
}
```

<box-model-margin-list />

## 等高布局

此布局多出现在分栏 有背景色或者中间有分隔线的布局中，有可能 左侧栏内容多，也有可能右侧栏内容多，但无 论内容多少，两栏背景色都和容器一样高。

<box-model-margin-contour />

```css
.column {
  overflow: hidden;
  color: #ffffff;
  text-align: center;
}

.column-left,
.column-right {
  float: left;
  width: 50%;

  margin-bottom: -99999px;
  padding-bottom: 99999px;
}

.column-left {
  background-color: #34538b;
}

.column-right {
  background-color: #cd0000;
}
```

垂直方向 margin 无法改变元素的内部尺寸，但却能改变外部尺寸，这里我们设置了 margin-bottom:-9999px 意味着元素的外部尺寸在垂直方向上小了 9999px。默认情况下，垂 直方向块级元素上下距离是 0，一旦 margin-bottom:-9999px 就意味着后面所有元素和上面元 素的空间距离变成了-9999px，也就是后面元素都往上移动了 9999px。此时，通过神来一笔 padding-bottom:9999px 增加元素高度，这正负一抵消，对布局层并无影响，但却带来了我们 需要的东西— 视觉层多了 9999px 高度的可使用的背景色。但是，9999px 太大了，所以需要配合父级 overflow:hidden 把多出来的色块背景隐藏掉，于是实现了视觉上的等高布局效果。

不知之处

1. 如果需要有子元素定位到容器之 外，父级的 overflow:hidden 是一个棘手的限制;其次，
2. 当触发锚点定位或者使用`DOM.scrollIntoview()`方法的时候，可能就会出现奇怪的定位问题，
