---
title: CSS 选择器
---

::: tip
:tada: 写 CSS 的时候你必须明确你要给哪个元素加上样式，CSS 选择器就是用来选择你想要元素
:::

## 通配符选择器

```css
* {
}
```

## ID 选择器

```css
#root {
}
```

## 类选择器

```css
// 选择类为info的元素
.info {
}
```

## 属性选择器

```css
[title] {
  // 选取含有title属性的元素
}
[title='cssworld'] {
  // 选取title的值为'cssworld'
}
[title~='cssworld'] {
  // 选取title的值含有'cssworld'的元素
}
[title^='cssworld'] {
  // 选取title的值以'cssworld'开头的元素
}
[title$='cssworld'] {
  // 选取title的值以'cssworld'结尾的元素
}
[title|='cssworld'] {
  // 选取带有以指定值开头的属性值的元素，该值必须是整个单词
}
```

## 后代选择器

```css
.children img {
  // 选取类名为children的后代元素中所有的img元素
}
```

## 相邻后代选择器

```css
.children > img {
  // 仅选取类名为children的子元素中的img元素（不包含孙子元素、重孙元素等）
}
```

## 兄弟选择器

```css
.children ~ img {
  // 选取类名为children *后面* 的所有img元素
}
```

## 相邻兄弟选择器

```css
.children + img {
  // 选取类名为children *相邻* 的img元素
}
```

## :root 选择器

:root 选择器匹配文档根元素。
在 HTML 中，根元素始终是 html 元素。
