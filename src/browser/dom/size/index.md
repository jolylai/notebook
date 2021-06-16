---
title: 元素尺寸
---

## documentElement

`Document.documentElement` 是一个会返回文档对象（document）的根元素的只读属性（如 HTML 文档的 `<html>` 元素）。

```js
const rootElement = document.documentElement;
```

## clientTop/Left

### HTMLElement.clientLeft

表示一个元素的左边框的宽度，以像素表示。如果元素的文本方向是从右向左（RTL, right-to-left），并且由于内容溢出导致左边出现了一个垂直滚动条，则该属性包括滚动条的宽度。clientLeft 不包括左外边距和左内边距。clientLeft 是只读的。

```js
const body = document.body;

// 即 CSS 中 border-left 的值
const borderLeft = body.clientLeft; // -> 20
```

`HTMLElement.clientTop`一个元素顶部边框的宽度（以像素表示）。不包括顶部外边距或内边距。clientTop 是只读的。

```js
const body = document.body;

// 即 CSS 中 border-top 的值
const borderLeft = body.clientTop; // -> 20
```

![](https://zh.javascript.info/article/size-and-scroll/metric-client-left-top.svg)

```jsx | inline
import React, { useState } from 'react';
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
  const [clientLeft, setClientLeft] = useState(0);
  const [clientTop, setClientTop] = useState(0);

  const handleRef = ref => {
    setClientLeft(ref && ref.clientLeft);
    setClientTop(ref && ref.clientTop);
  };

  return (
    <div>
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
      </Container>
      <p>
        clientLeft: {clientLeft} clientTop: {clientTop}
      </p>
    </div>
  );
};
```

![](https://zh.javascript.info/article/size-and-scroll/metric-client-left-top-rtl.svg)

```jsx | inline
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  height: 200px;
  overflow: auto;
  border: 25px solid #e8c48f;
  padding: 20px;
  box-sizing: content-box;
  direction: rtl;
`;

export default () => {
  const [clientLeft, setClientLeft] = useState(0);
  const [clientTop, setClientTop] = useState(0);

  const handleRef = ref => {
    setClientLeft(ref && ref.clientLeft);
    setClientTop(ref && ref.clientTop);
  };

  return (
    <div>
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
      </Container>
      <p>
        clientLeft: {clientLeft} clientTop: {clientTop}
      </p>
    </div>
  );
};
```

## clientWidth/Height

这些属性提供了元素边框内区域的大小。

它们包括了 “content width” 和 “padding”（即 `content + padding`），但不包括滚动条宽度（scrollbar）

![](https://zh.javascript.info/article/size-and-scroll/metric-client-width-height.svg)

如果这里没有 padding，那么 clientWidth/Height 代表的就是内容区域，即 border 和 scrollbar（如果有）内的区域。

```jsx | inline
import React, { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  border: 25px solid #e8c48f;
  padding: 20px;
  box-sizing: content-box;
`;

export default () => {
  const handleRef = ref => {
    // console.log('ref: ', ref.offsetParent);
    // console.log('ref: ', ref.clientLeft);
  };

  return (
    <Container ref={handleRef}>
      <p>
        This Ecma Standard is based on several originating technologies, the
        most well known being JavaScript (Netscape) and JScript (Microsoft). The
        language was invented by Brendan Eich at Netscape and first appeared in
        that company's Navigator 2.0 browser.
      </p>
    </Container>
  );
};
```

需要考虑到滚动条的宽度

### HTMLElement.clientWidth

`HTMLElement.clientWidth` 属性表示元素的内部宽度，以像素计。该属性包括内边距，但不包括垂直滚动条（如果有）、边框和外边距

如果出现滚动条，滚动条会遮盖元素的宽高，那么该属性就是其本来宽高减去滚动条的宽高

### HTMLElement.clientHeight

`HTMLElement.clientHeight` 属性表示元素的内部高度，以像素计。该属性包括内边距，但不包括垂直滚动条（如果有）、边框和外边距（即 `content + padding`）。

这一对属性是用来读取元素的 border 的宽度和高度的
