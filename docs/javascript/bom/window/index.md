---
title: window
order: 1
group:
  title: BOM
  order: 20
---

## 前言

BOM(浏览器对象模型)

## 窗口关系

| Syntax | Description                                        |
| ------ | -------------------------------------------------- |
| top    | 对象始终指向最上层(最外层)窗口，即浏览器窗口本身。 |
| parent | 对象则始终指向当前窗口的父窗口                     |
| self   | 始终会指向 window。                                |

如果当前窗口是最上层窗口，则 parent 等于 top(都等于 window)。

## 窗口大小

outerWidth 和 outerHeight 返回浏览器窗口自身的大小(不管是在最外层 window 上使用，还是在窗格`<frame>`中使用)。

innerWidth 和 innerHeight 返回浏览器窗口中页面视口的大小(不包含浏览器边框和工具栏)。

document.documentElement.clientWidth 和 document.documentElement.clientHeight 返回**页面视口**的宽度和高度。

IE8 及更早版本没有提供取得当前浏览器窗口尺寸的属性;不过，它通过 DOM 提供了页面可见区域的相关信息。
在 IE、Firefox、Safari、Opera 和 Chrome 中，`document.documentElement.clientWidth` 和 `document.documentElement.clientHeight` 中保存了页面视口的信息。在 IE6 中，这些属性必须在 标准模式下才有效;如果是混杂模式，就必须通过 `document.body.clientWidth` 和 `document.body. clientHeight` 取得相同信息。而对于混杂模式下的 Chrome，则无论通过 `document.documentElement` 还是 `document.body` 中的 `clientWidth` 和 `clientHeight` 属性，都可以取得视口的大小。

```js
let pageWidth = window.innerWidth;
let pageHeight = window.innerHeight;

if (typeof pageWidth != 'number') {
  if (document.compatMode == 'CSS1Compat') {
    // 标准模式
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
  } else {
    // 混杂模式
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
  }
}
```

## 视口位置

```js
// 相对于当前视口向下滚动 100 像素
window.scrollBy(0, 100);
// 相对于当前视口向右滚动 40 像素
window.scrollBy(40, 0);
// 滚动到页面左上角
window.scrollTo(0, 0);

// 滚动到距离屏幕左边及顶边各 100 像素的位置
window.scrollTo(100, 100);

// 正常滚动
window.scrollTo({
  left: 100,
  top: 100,
  behavior: 'auto'
});

 // 平滑滚动
window.scrollTo({ 4
      left: 100,
      top: 100,
      behavior: 'smooth'
});
```

<code src="./demos/ScrollBehavior" />
