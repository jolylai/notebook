---
title: 图片优化
---

## 前言

图像选型一定要知道每种图像类型的体积/质量/兼容/请求/压缩/透明/场景等参数相对值，这样才能迅速做出判断在何种场景使用何种类型的图像。

| 类型   | 体积   | 质量 | 兼容 | 请求 | 压缩 | 透明   | 场景                       |
| ------ | ------ | ---- | ---- | ---- | ---- | ------ | -------------------------- |
| JPG    | 小     | 中   | 高   | 是   | 有损 | 不支持 | 背景图、轮播图、色彩丰富图 |
| PNG    | 大     | 高   | 高   | 是   | 无损 | 支持   | 图标、透明图               |
| SVG    | 小     | 高   | 高   | 是   | 无损 | 支持   | 图标、矢量图               |
| WebP   | 小     | 中   | 低   | 是   | 兼备 | 支持   | 看兼容情况                 |
| Base64 | 看情况 | 中   | 高   | 否   | 无损 | 支持   | 图标                       |

## 图片压缩

## 懒加载

1. 首先给图片一个占位资源,`img` 只有被赋值 `src` 值的时候浏览器才会加载图片，在`img` 进入可视区的时候, 设置 `img` 的`src`

```html
<img class="lazy" data-src="https://source.unsplash.com/random/800x600" />
```

2. 通过监听 scroll 事件来判断图片是否到达视口时加载图片

```js
const load = element => {
  if (element.getAttribute('data-src')) {
    element.src = element.getAttribute('data-src');
    element.setAttribute('data-loaded', true);
  }
};
```

`img` 进入可视区的时候将 `img` 设置成以下值

```html
<img
  class="lazy"
  data-src="https://source.unsplash.com/random/800x600"
  src="https://source.unsplash.com/random/800x600"
  data-loaded="true"
/>
```

3. 在元素进入可视区域的时候将图片的 `data-src` 赋值到 `src` 中，并标注`data-loaded="true"` 为已加载

```js
const load = element => {
  element.src = element.getAttribute('data-src');
  element.setAttribute('data-loaded', true);
};
```

<!-- <code src='./demos/LazyImage.jsx' inline /> -->

我们需要知道哪些元素需要懒加载，用户可传入的可能是一个元素，元素列表或者一个选择器

```js
const getElements = (selector, root = document) => {
  if (selector instanceof Element) {
    return [selector];
  }

  if (selector instanceof NodeList) {
    return selector;
  }

  return root.querySelectorAll(selector);
};
```

### 1. clientHeight、scrollTop 和 offsetTop

```js
function isInViewPortOfOne(el) {
  // viewPortHeight 兼容所有浏览器写法
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const offsetTop = el.offsetTop;
  const scrollTop = document.documentElement.scrollTop;
  const top = offsetTop - scrollTop;
  return top <= viewPortHeight;
}
```

### 2. getBoundingClientRect

```js
function isInViewPort(element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const { top, right, bottom, left } = element.getBoundingClientRect();

  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}
```

### 3. IntersectionObserver

```js
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    entry.time; // 触发的时间
    entry.rootBounds; // 根元素的位置矩形，这种情况下为视窗位置
    entry.boundingClientRect; // 被观察者的位置举行
    entry.intersectionRect; // 重叠区域的位置矩形
    entry.intersectionRatio; // 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）
    entry.target; // 被观察者

    if (entry.intersectionRatio > 0 || entry.isIntersecting) {
      // 只需要首次进入可视区时加载一次·
      observer.unobserve(entry.target);
      // entry.target元素进入区域了
    }
  });
});

// 观察元素
observer.observe(element);
```

- `entry.boundingClientRect`: 当前观察元素的矩形区域，top/right/bottom/left 属性可以获得此时相对视区的距离，width/height 属性包含尺寸。此属性和 Element.getBoundingClientRect()这个 API 方法非常类似。
- `entry.intersectionRatio`: 当前元素被交叉的比例。比例要想非常详细，需要 IntersectionObserver()函数的第 2 个可选参数中设置 thresholds 参数，也就是设置触发交叉事件的阈值。
- `entry.intersectionRect`: 和视区交叉的矩形大小。
- `entry.isIntersecting`: 如果是 true，则表示元素从视区外进入视区内。
- `entry.rootBounds`: 窗体根元素的矩形区域对象。
- `entry.target`: 当前交叉的元素。
- `entry.time`: 当前时间戳。

#### Reference

- [lozad.js](https://github.com/ApoorvSaxena/lozad.js)
- [Intersection Observer](https://mp.weixin.qq.com/s/fu6VqPfWn7mB7evopnDeLA)
