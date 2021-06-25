---
title: window
order: 1
group:
  title: BOM
  order: 2
---

## 前言

BOM(浏览器对象模型)

## Window 视图属性

### innerWidth 和 innerHeight

innerWidth 表示获取 window 窗体的内部宽度，不包括用户界面元素，比如窗框。

```js
// 视图容器尺寸
window.innerWidth;
window.innerHeight;
```

### outerWidth 和 outerHeight

outerWidth/outerHeight 表示整个浏览器窗体的大小，包括任务栏等。

```js
// 窗口本身的尺寸
window.outerWidth;
window.outerHeight;
```

### pageXOffset 和 pageYOffset

表示整个页面滚动的像素值（水平方向的和垂直方向的）。

### screenX 和 screenY

浏览器窗口在显示器中的位置，screenX 表示水平位置，screenY 表示垂直位置。

### 获取视图窗口大小

IE8 及更早版本没有提供取得当前浏览器窗口尺寸的属性;不过，它通过 DOM 提供了页面可见区域的相关信息。
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