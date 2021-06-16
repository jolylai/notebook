---
title: window
order: 1
group:
  title: BOM
  order: 2
---

## 前言

BOM(浏览器对象模型)

## 窗口大小

```js
// 窗口本身的尺寸
window.outerWidth;
window.outerHeight;

// 视图容器尺寸
window.innerWidth;
window.innerHeight;
```

IE8 及更早版本没有提供取得当前浏览器窗口尺寸的属性;不过，它通过 DOM 提供了页面可见区域 的相关信息。
在 IE、Firefox、Safari、Opera 和 Chrome 中，`document.documentElement.clientWidth` 和 `document.documentElement.clientHeight` 中保存了页面视口的信息。在 IE6 中，这些属性必须在 标准模式下才有效;如果是混杂模式，就必须通过 `document.body.clientWidth` 和 `document.body. clientHeight` 取得相同信息。而对于混杂模式下的 Chrome，则无论通过 `document.documentElement` 还是 `document.body` 中的 `clientWidth` 和 `clientHeight` 属性，都可以取得视口的大小。

```js
let pageWidth = window.innerWidth;
let pageHeight = window.innerHeight;

if (typeof pageWidth != 'number') {
  if (document.compatMode == 'CSS1Compat') {
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
  } else {
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
  }
}
```

# 元素大小和滚动

```jsx | inline
import React, { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  height: 200px;
  overflow: auto;
  border: 25px solid #e8c48f;
  padding: 20px;
  box-sizing: content-box;
`;

export default () => {
  const handleRef = ref => {
    // console.log('ref: ', ref.offsetParent);
    // console.log('ref: ', ref.offsetLeft);
  };

  return (
    <div
      style={{
        position: 'relative',
        padding: 20,
        boxSizing: 'content-box',
        border: '20px solid',
      }}
    >
      <Container ref={handleRef}>
        <h3>Introduction</h3>
        <p>
          This Ecma Standard is based on several originating technologies, the
          most well known being JavaScript (Netscape) and JScript (Microsoft).
          The language was invented by Brendan Eich at Netscape and first
          appeared in that company's Navigator 2.0 browser. It has appeared in
          all subsequent browsers from Netscape and in all browsers from
          Microsoft starting with Internet Explorer 3.0. The development of this
          Standard started in November 1996. The first edition of this Ecma
          Standard was adopted by the Ecma General Assembly of June 1997.
        </p>

        <p>
          That Ecma Standard was submitted to ISO/IEC JTC 1 for adoption under
          the fast-track procedure, and approved as international standard
          ISO/IEC 16262, in April 1998. The Ecma General Assembly of June 1998
          approved the second edition of ECMA-262 to keep it fully aligned with
          ISO/IEC 16262. Changes between the first and the second edition are
          editorial in nature.
        </p>

        <p>
          The third edition of the Standard introduced powerful regular
          expressions, better string handling, new control statements, try/catch
          exception handling, tighter definition of errors, formatting for
          numeric output and minor changes in anticipation of forthcoming
          internationalisation facilities and future language growth. The third
          edition of the ECMAScript standard was adopted by the Ecma General
          Assembly of December 1999 and published as ISO/IEC 16262:2002 in June
          2002.
        </p>
      </Container>
    </div>
  );
};
```

[HTML 的各种宽高](https://www.jianshu.com/p/60332df38393)

## scroll

### Element.scrollWidth

`Element.scrollWidth` 是只读属性，表示元素内容的宽度，包括由于滚动而未显示在屏幕中内容

scrollWidth 值等于元素在不使用水平滚动条的情况下适合视口中的所有内容所需的最小宽度。 宽度的测量方式与 clientWidth 相同：它包含元素的内边距，但不包括边框，外边距或垂直滚动条（如果存在）。 它还可以包括伪元素的宽度，例如::before 或::after。 如果元素的内容可以适合而不需要水平滚动条，则其 scrollWidth 等于 clientWidth

### Element.scrollHeight

`Element.scrollHeight` 这个只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。

scrollHeight 的值等于该元素在不使用滚动条的情况下为了适应视口中所用内容所需的最小高度。 没有垂直滚动条的情况下，scrollHeight 值与元素视图填充所有内容所需要的最小值 clientHeight 相同。包括元素的 padding，但不包括元素的 border 和 margin。scrollHeight 也包括 ::before 和 ::after 这样的伪元素。

### Element.scrollTop

`Element.scrollTop` 属性可以获取或设置一个元素的内容垂直滚动的像素数。

一个元素的 scrollTop 值是这个元素的顶部到视口可见内容（的顶部）的距离的度量。当一个元素的内容没有产生垂直方向的滚动条，那么它的 scrollTop 值为 0。

### Element.scrollLeft

`Element.scrollLeft` 属性可以读取或设置元素滚动条到元素左边的距离。

注意如果这个元素的内容排列方向（direction） 是 rtl (right-to-left) ，那么滚动条会位于最右侧（内容开始处），并且 scrollLeft 值为 0。此时，当你从右到左拖动滚动条时，scrollLeft 会从 0 变为负数（这个特性在 chrome 浏览器中不存在）。
