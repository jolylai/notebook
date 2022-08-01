---
title: content
group:
  title: 盒子模型
  order: 20
---

# content

<!-- <iframe src="//player.bilibili.com/player.html?aid=414051684&bvid=BV13V411z7do&cid=217294401&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width='100%' height='600'> </iframe> -->

<!-- <iframe src="//player.bilibili.com/player.html?aid=414051684&bvid=BV13V411z7do&cid=217294401&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width='100%' height='600'> </iframe> -->

## 替换元素

通过修改某个属性值呈现的内容就可以被替换的元素就称为`替换元素`。`<img>`、`<object>`、`<video>`、`<iframe>`或者表单元素`<textarea>`和`<input>`都是典型的替换元素。

根据是否具有可替换内容，我们也可以把元素分为`替换元素`和`非替换元素`。

- 内容的外观不受页面上的 CSS 的影响。
- 有自己的尺寸。
- 在很多 CSS 属性上有自己的一套表现规则。

所有的替换元素都是内联水平元素，也就是替换元素和替换元素、替换元素和文字都是可以在一行显示的。

## 尺寸计算

<img src="https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/jucy-beef-burger.jpg" />

HTML 尺寸

```html
<img width="300" height="100" />
<input type="file" size="30" />
<textarea cols="20" rows="5"></textarea>
```

## 什么是替换元素

根据是否具有可替换内容，我们也可以把元素分为`替换元素`和`非替换元素`。

通过修改某个属性值呈现的内容就可以被替换的元素就称为`替换元素`。

修改`<img>`的`src` 属性就可以显示不同的图片

```html
<img src="https://source.unsplash.com/random' />
```

因此，`<img>`、`<object>`、`<video>`、`<iframe>`或者表单元素`<textarea>`和`<input>`都是典型 的替换元素。

1. 内容的外观不受页面上的 CSS 的影响。

<box-model-content-radio />

- 有自己的尺寸。
- 在很多 CSS 属性上有自己的一套表现规则。

所有的替换元素都是内联水平元素，也就是替换元素和替换元素、替换元素和文字都是可以在一行显示的。

## 尺寸计算

<box-model-content-size />
