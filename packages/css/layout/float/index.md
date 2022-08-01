# 浮动

> 浮动的本质就是为了实现文字环绕效果。

<script setup>
  import demo1 from './demos/demo1.vue'
  import demo2 from './demos/demo2.vue'
  import demo3 from './demos/demo3.vue'
  import demo4 from './demos/demo4.vue'
  import demo5 from './demos/demo5.vue'
  import demo6 from './demos/demo6.vue'
</script>

### 特性

#### 包裹性

包裹性: 由“包裹”和“自适应性”两部分组成。

**包裹**: 假设浮动元素父元素宽度 200px，浮动元素子元素是一个 128px 宽度的图片， 则此时浮动元素宽度表现为“包裹”，就是里面图片的宽度 128px

<demo1 />

<<< @/guide/layout/float/demos/demo1.vue

**自适应性**: 如果浮动元素的子元素不只是一张 128px 宽度的图片，还有一大波普通 的文字,则此时浮动元素宽度就自适应父元素的 200px 宽度，最终的宽度表现也是 200px。

<demo2 />

<<< @/guide/layout/float/demos/demo2.vue

### 块状化并格式化上下文

块状化的意思是，元素一旦 float 的属性值不为 none，则其 display 计算值就是 block 或者 table。

<demo3 />

也不要指望使用 `text-align` 属性控制浮动元素的左右对齐，因为 `text-align` 对块级元素是无效的。

```css
span {
  float: left;
  display: block; /* 多余 */
}
span {
  float: left;
  vertical-align: middle; /* 多余 */
}
```

<demo4 />

### 破坏文档流

### 没有任何 margin 合并

"行框盒子(每行内联元素所在的那个盒子)和浮动元素的不可重叠性”，也就是“行框盒子如果和浮动元素的垂直高度有 重叠，则行框盒子在正常定位状态下只会跟随浮动元素，而不会发生重叠”。

<demo6 />

浮动后面元素 `margin` 负无穷大依然无效，只有外部的块状容器盒子尺寸变大，而和浮动元素垂直方向有重叠的“行框盒子” 依然被限死在那里

```css
.basis-float-content {
  margin-left: -100px;
}
```

## 作用机制

- **浮动锚点**： float 元素所在的“流”中的一个点，这个点本身并不浮动，就表现而言 更像一个没有 margin、border 和 padding 的空的内联元素。
- **浮动参考**：浮动元素对齐参考的实体。

为何右浮动时`html` 的结构要反着写

```html
<li class="basis-float-list-item">
  <span class="badge">14</span>
  Cras justo odio
</li>
```

看看具体的表现效果

反着写的优点

- 不管内容没满一行，刚满一行，还是多行，浮动元素都以第一行对齐，且具有良好的样式
- 兼容 IE7 等低版本浏览器，因为 IE7 浮动的元素会在下一行内容的右边

## 两栏或多栏的自适应布局

 <!-- demo9 -->

原理其实很简单，content 元素没有浮动，也没有设置宽度，因此，流动性保持得很好， 设置 margin-left、border-left 或者 padding-left 都可以自动改变 content box 的尺寸，
继而实现了宽度自适应布局效果。

## 清除浮动

<demo5 />

`clear:both` 的作用本质是让自己不和 float 元素在一行显示

```css
.clearfix::after {
  display: block;
  clear: both;
  content: '';
}
```

clear 属性只有块级元素才有效的，而::after 等伪元素默认都是内联水平，这就是借
助伪元素清除浮动影响时需要设置 display 属性值的原因。

## BFC
