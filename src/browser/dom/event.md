---
title: 事件
---

## 事件冒泡

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Event Bubbling Example</title>
  </head>
  <body>
    <div id="myDiv">Click Me</div>
  </body>
</html>
```

**事件冒泡(event bubbling)**，即事件开始时由最具体的元素(文档中嵌套层次最深 的那个节点)接收，然后逐级向上传播到较为不具体的节点(文档)。
`<div> -> <body> -> <html> -> document`

**事件捕获**的思想 是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。事件捕获的用意在于在 事件到达预定目标之前捕获它`document -> <html> -> <body> -> <div>`

<Alert>
建议读者放心地使用事件冒泡，在有特殊需要时再使用事件捕获。
</Alert>

**事件流**包括三个阶段:事件捕获阶段、处于目标阶段和事件冒泡阶段。

在 DOM 事件流中，实际的目标(`<div>`元素)在捕获阶段不会接收到事件。这意味着在捕获阶段， 事件从 `document` 到`<html>`再到`<body>`后就停止了。下一个阶段是“处于目标”阶段，于是事件在`<div>` 上发生，并在事件处理(后面将会讨论这个概念)中被看成冒泡阶段的一部分。然后，冒泡阶段发生， 事件又传播回文档。

## 事件处理程序

HTML 事件处理程序

```html
<input type="button" value="Click Me" onclick="handleClick()" />

<input type="button" value="Click Me" onclick="handleClick(event)" />

<input type="button" value="Click Me" onclick="handleClick(this)" />
```

### DOM0 级事件处理程序

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Event</title>
  </head>
  <body>
    <button id="btn">button</button>
  </body>
</html>
```

每个元素(包括 window 和 document)都有自己的事件处理程序属性，这些属性通常全部小写， 例如 onclick。将这种属性的值设置为一个函数，就可以指定事件处理程序，如下所示:

```js
const btn = document.getElementById('btn');

// onclick 为小写
btn.onclick = function(event) {
  console.log('this', this);
  // this 引用当前元素 即 <button id="btn">button</button>
};
```

使用 ES6 箭头函数指定的事件处理程序

```js
const btn = document.getElementById('btn');

btn.onclick = event => {
  console.log('this', this);
  // this 为windows 对象
};
```

删除通过 DOM0 级方法指定的事件处理程序

```js
//删除事件处理程序
btn.onclick = null;
```

### DOM2 级事件处理程序

使用 DOM2 级方法添加事件处理程序的主要好处是可以添加多个事件处理程序。

```js
const btn = document.getElementById('btn');

btn.addEventListener(
  'click',
  function(event) {
    console.log(this);
  },
  false,
);

btn.addEventListener(
  'click',
  event => {
    console.log(this);
  },
  false,
);
```

通过 addEventListener()添加的事件处理程序只能使用 removeEventListener()来移除;

```js
const btn = document.getElementById('btn');

const handler = function(event) {
  console.log(this);
};

btn.addEventListener('click', handler, false);

btn.removeEventListener('click', handler, false);
```

移除时传入的参数与添加处理程序时使用的参数相同。这也意味着通过 addEventListener()添加的匿名函数将无法移除

```js
var EventUtil = {
  addHandler: function(element, type, handler) {
    if (element.addEventListener) {
      // DOM2
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      // IE
      element.attachEvent('on' + type, handler);
    } else {
      // DOM0
      element['on' + type] = handler;
    }
  },
  removeHandler: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  },
};
```

## 事件对象

在触发 DOM 上的某个事件时，会产生一个事件对象 event，这个对象中包含着所有与事件有关的 3 信息。包括导致事件的元素、事件的类型以及其他与特定事件相关的信息。

| 属性/方法                  | 类型     | 说明                                                                          |
| -------------------------- | -------- | ----------------------------------------------------------------------------- |
| bubbles                    | Boolean  | 表明事件是否冒泡                                                              |
| cancelable                 | Boolean  | 表明是否可以取消事件的默认行为                                                |
| currentTarget              | Element  | 其事件处理程序当前正在处理事件的那个元素                                      |
| target                     | Element  | 事件的目标                                                                    |
| defaultPrevented           | Boolean  | 为 true 表 示 已 经 调 用 了 preventDefault() (DOM3 级事件中新增)             |
| detail                     | Integer  | 与事件相关的细节信息                                                          |
| eventPhase                 | Integer  | 调用事件处理程序的阶段:1 表示捕获阶段，2 表示“处于目标”，3 表示冒泡阶段       |
| preventDefault()           | Function | 取消事件的默认行为。如果 cancelable 是 true，则可以使用这个方法               |
| stopPropagation()          | Function | 取消事件的进一步捕获或冒泡。如果 bubbles 为 true，则可以使用这个方法          |
| stopImmediatePropagation() | Function | 取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用(DOM3 级事件中新增) |

### target

在事件处理程序内部，对象 this 始终等于 currentTarget 的值，而 target 则只包含事件的实 际目标。如果直接将事件处理程序指定给了目标元素，则 this、currentTarget 和 target 包含相同 的值。

```js
const btn = document.getElementById('btn');

btn.onclick = function(event) {
  alert(event.currentTarget === this); //true
  alert(event.target === this); //true
};

document.body.onclick = function(event) {
  console.log('this', this); // 始终为 <body>
  console.log('target', event.target); // 鼠标点击的元素
  console.log('currentTarget', event.currentTarget); // 始终为 <body>
};
```

### preventDefault

链接的默认行为就是在 被单击时会导航到其 href 特性指定的 URL。如果你想阻止链接导航这一默认行为，那么通过链接的 onclick 事件处理程序可以取消它

```js
var link = document.getElementById('myLink');
link.onclick = function(event) {
  event.preventDefault();
};
```

### stopPropagation

stopPropagation()方法用于立即停止事件在 DOM 层次中的传播，即取消进一步的事件 捕获或冒泡

```js
var btn = document.getElementById('myBtn');
btn.onclick = function(event) {
  alert('Clicked');
  event.stopPropagation();
};
document.body.onclick = function(event) {
  alert('Body clicked');
};
```

只有 cancelable 属性设置为 true 的事件，才可以使用 preventDefault()来取消其默认行为。

### eventPhase

事件对象的 eventPhase 属性，可以用来确定事件当前正位于事件流的哪个阶段。

```js
const btn = document.getElementById('btn');

const handler = function(evnet) {
  console.log(event.eventPhase);
};
// 2 处于目标阶段和
btn.onclick = handler;

// 1 事件捕获阶段
document.body.addEventListener('click', handler, true);

// 3 事件冒泡阶段
document.body.onclick = handler;
```

`eventPhase` 值

- `1`: 事件处理程序处于捕获阶段调用的
- `2`: 事件处理程序处于目标对象上
- `3`: 事件处理程序处于冒泡阶段

## 事件类型

- UI(User Interface，用户界面)事件，当用户与页面上的元素交互时触发;
- 焦点事件，当元素获得或失去焦点时触发;
- 鼠标事件，当用户通过鼠标在页面上执行操作时触发;
- 滚轮事件，当使用鼠标滚轮(或类似设备)时触发;
- 文本事件，当在文档中输入文本时触发;
- 键盘事件，当用户通过键盘在页面上执行操作时触发;
- 合成事件，当为 IME(Input Method Editor，输入法编辑器)输入字符时触发;
- 变动(mutation)事件，当底层 DOM 结构发生变化时触发。

### UI

- `load`:当页面完全加载后在 window 上面触发，当所有框架都加载完毕时在框架集上面触发， 当图像加载完毕时在`<img>`元素上面触发，或者当嵌入的内容加载完毕时在`<object>`元素上面 触发。
- `unload`:当页面完全卸载后在 window 上面触发，当所有框架都卸载后在框架集上面触发，或 者当嵌入的内容卸载完毕后在`<object>`元素上面触发。
- `abort`:在用户停止下载过程时，如果嵌入的内容没有加载完，则在`<object>`元素上面触发。
- `error`:当发生 JavaScript 错误时在 window 上面触发，当无法加载图像时在`<img>`元素上面触 发，当无法加载嵌入内容时在`<object>`元素上面触发，或者当有一或多个框架无法加载时在框
  架集上面触发。第 17 章将继续讨论这个事件。
- `select`:当用户选择文本框`(<input>`或`<texterea>`)中的一或多个字符时触发。第 14 章将
  继续讨论这个事件。
- `resize`:当窗口或框架的大小变化时在 window 或框架上面触发。
- `scroll`:当用户滚动带滚动条的元素中的内容时，在该元素上面触发。`<body>`元素中包含所加

#### load

JavaScript 中最常用的一个事件就是 load。当页面完全加载后(包括所有图像、JavaScript 文件、 CSS 文件等外部资源)，就会触发 window 上面的 load 事件。

```js
window.onload = function() {
  console.log('Loaded');
};
```

一般来说，在 window 上面发生的任何事件都可以在`<body>`元素中通过相应的特性来指定，因为 在 HTML 中无法访问 window 元素。实际上，这只是为了保证向后兼容的一种权宜之计，但所有浏览器 都能很好地支持这种方式。我们建议读者尽可能使用 JavaScript 方式。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Event</title>
  </head>
  <body onload="alert('Loaded!')"></body>
</html>
```

图像上面也可以触发 load 事件，无论是在 DOM 中的图像元素还是 HTML 中的图像元素。

```html
<img src="smile.gif" onload="alert('Image loaded.')" />
```

同样的功能也可以使用 JavaScript 来实现

```js
const img = document.getElementById('img');
img.onload = function() {
  console.log('ImgLoaded');
};
```

完全使用 JavaScript 无 `<img />` 元素

```js
const img = new Image();
img.onload = function() {
  console.log('ImgLoaded');
};
img.src = 'smile.gif';
```

有 的浏览器将 Image 对象实现为`<img>`元素，但并非所有浏览器都如此，所以最好将它们区别对待。

#### unload 事件

与 load 事件对应的是 unload 事件，这个事件在文档被完全卸载后触发。只要用户从一个页面切换到另一个页面，就会发生 unload 事件。而利用这个事件最多的情况是清除引用，以避免内存泄漏。

```js
window.onunload = function() {
  console.log('Loaded');
};
```

<Alert>
无论使用哪种方式，都要小心编写onunload事件处理程序中的代码。既然unload事件是在一切 都被卸载之后才触发，那么在页面加载后存在的那些对象，此时就不一定存在了。此时，操作 DOM 节 点或者元素的样式就会导致错误。
</Alert>

#### resize 事件

当浏览器窗口被调整到一个新的高度或宽度时，就会触发 resize 事件。这个事件在 window(窗 口)上面触发，因此可以通过 JavaScript 或者`<body>`元素中的 onresize 特性来指定事件处理程序。

```js
window.onresize = function(event) {
  console.log('event: ', event.target); // windows
};
```

<Alert>
注意不要在这个事件的处理程序中加入 大计算量的代码，因为这些代码有可能被频繁执行，从而导致浏览器反应明显变慢。
</Alert>

#### scroll 事件

虽然 scroll 事件是在 window 对象上发生的，但它实际表示的则是页面中相应元素的变化。在混 杂模式下，可以通过`<body>`元素的 scrollLeft 和 scrollTop 来监控到这一变化;而在标准模式下， 除 Safari 之外的所有浏览器都会通过`<html>`元素来反映这一变化(Safari 仍然基于`<body>`跟踪滚动位 置)

```js
window.onscroll = function(event) {
  if (document.compatMode == 'CSS1Compat') {
    alert(document.documentElement.scrollTop);
  } else {
    alert(document.body.scrollTop);
  }
};
```

`Document.documentElement` 是一个会返回文档对象（document）的根元素的只读属性（如 HTML 文档的 `<html>` 元素）。

### 焦点事件

- `blur`:在元素失去焦点时触发。这个事件不会冒泡;所有浏览器都支持它。
- `focus`:在元素获得焦点时触发。这个事件不会冒泡;所有浏览器都支持它。
- `focusin`:在元素获得焦点时触发。这个事件与 HTML 事件 focus 等价，但它冒泡
- `focusout`:在元素失去焦点时触发。这个事件是 HTML 事件 blur 的通用版本。

当焦点从页面中的一个元素移动到另一个元素，会依次触发下列事件:

1. `focusout`： 在失去焦点的元素上触发;
2. `focusin`： 在获得焦点的元素上触发;
3. `blur`： 在失去焦点的元素上触发;
4. `DOMFocusOut`： 在失去焦点的元素上触发;
5. `focus`： 在获得焦点的元素上触发;
6. `DOMFocusIn`： 在获得焦点的元素上触发。

blur、DOMFocusOut 和 focusout 的事件目标是失去焦点的元素;而 focus、DOMFocusIn
和 focusin 的事件目标是获得焦点的元素。

#### 鼠标与滚轮事件

- `click`:在用户单击主鼠标按钮(一般是左边的按钮)或者按下回车键时触发。这一点对确保 易访问性很重要，意味着 onclick 事件处理程序既可以通过键盘也可以通过鼠标执行。
- `dblclick`:在用户双击主鼠标按钮(一般是左边的按钮)时触发。
- `mousedown`:在用户按下了任意鼠标按钮时触发。不能通过键盘触发这个事件。
- `mouseenter`:在鼠标光标从元素外部首次移动到元素范围之内时触发。这个事件不冒泡，而且 在光标移动到后代元素上不会触发。
- `mouseleave`:在位于元素上方的鼠标光标移动到元素范围之外时触发。这个事件不冒泡，而且在光标移动到后代元素上不会触发。
- `mousemove`:当鼠标指针在元素内部移动时重复地触发。不能通过键盘触发这个事件。
- `mouseout`:在鼠标指针位于一个元素上方，然后用户将其移入另一个元素时触发。又移入的另一个元素可能位于前一个元素的外部，也可能是这个元素的子元素。不能通过键盘触发这个事件。
- `mouseover`:在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触 发。不能通过键盘触发这个事件。
- `mouseup`:在用户释放鼠标按钮时触发。不能通过键盘触发这个事件。

页面上的所有元素都支持鼠标事件。除了 mouseenter 和 mouseleave，所有鼠标事件都会冒泡，
也可以被取消，而取消鼠标事件将会影响浏览器的默认行为。

只有在同一个元素上相继触发 mousedown 和 mouseup 事件，才会触发 click 事件;如果 mousedown 或 mouseup 中的一个被取消，就不会触发 click 事件。

只有触发两次 click 事 件，才会触发一次 dblclick 事件。如果有代码阻止了连续两次触发 click 事件(可能是直接取消 click 事件，也可能通过取消 mousedown 或 mouseup 间接实现)，那么就不会触发 dblclick 事件了

```js
const btn = document.getElementById('btn');
btn.onmousedown = function() {
  console.log('mousedown');
};
btn.onmouseup = function(evetn) {
  evetn.stopImmediatePropagation();
  console.log('mouseup');
};
btn.onclick = function() {
  console.log('click');
};
btn.ondblclick = function() {
  console.log('dbclick');
};
```

#### 客户区坐标位置

```js
document.body.onclick = function(event) {
  console.log('client coordinates', event.clientX, event.clientY);
};
```

<Alert>
这些值中不包括页面滚动的距离，因此这个位置并不表示鼠标在页面上的位置。
</Alert>

#### 页面坐标位置

通过客户区坐标能够知道鼠标是在视口中什么位置发生的，而页面坐标通过事件对象的 pageX 和 pageY 属性，能告诉你事件是在页面中的什么位置发生的。换句话说，这两个属性表示鼠标光标在页面 中的位置，因此坐标是从页面本身而非视口的左边和顶边计算的。

```js
document.body.onclick = function(event) {
  console.log('Page coordinates', event.pageX, event.pageY);
};
```

在页面没有滚动的情况下，pageX 和 pageY 的值与 clientX 和 clientY 的值相等。

```js
document.body.onclick = function(event) {
  var pageX = event.pageX,
    pageY = event.pageY;
  if (pageX === undefined) {
    pageX =
      event.clientX +
      (document.body.scrollLeft || document.documentElement.scrollLeft);
  }
  if (pageY === undefined) {
    pageY =
      event.clientY +
      (document.body.scrollTop || document.documentElement.scrollTop);
  }
  console.log('Page coordinates: ' + pageX + ',' + pageY);
};
```

#### 屏幕坐标位置

鼠标事件发生时，不仅会有相对于浏览器窗口的位置，还有一个相对于整个电脑屏幕的位置。而通 过 screenX 和 screenY 属性就可以确定鼠标事件发生时鼠标指针相对于整个屏幕的坐标信息。

```js
document.body.onclick = function(event) {
  console.log('Screen coordinates', event.screenX, event.screenY);
};
```

## 事件类型

| 事件          | 触发时机                                                                                                                                              | 冒泡 | 键盘触发 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------- |
| `mouseenter`  | 在鼠标光标从元素外部首次移动到元素范围之内时触发，而且 在光标移动到后代元素上不会触发。                                                               | 否   |
| `mousemove`   | 当鼠标指针在元素内部移动时重复地触发。                                                                                                                |      | 否       |
| `mousedown`   | 在用户按下了任意鼠标按钮时触发。                                                                                                                      |      | 否       |
| `mouseover`   | 在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触发。                                                                            |      | 否       |
| `click`       | 在用户单击主鼠标按钮(一般是左边的按钮)或者按下回车键时触发。这一点对确保易访问性很重要，意味着 onclick 事件处理程序既可以通过键盘也可以通过鼠标执行。 | 是   | 是       |
| `dblclick`    | 在用户双击主鼠标按钮(一般是左边的按钮)时触发。                                                                                                        |
| `mouseleave`  | 在位于元素上方的鼠标光标移动到元素范围之外时触发。**这个事件不冒泡，而且在光标移动到后代元素上不会触发。**                                            |
| `mouseout`    | 在鼠标指针位于一个元素上方，然后用户将其移入另一个元素时触发。又移入的另一个元素可能位于前一个元素的外部，也**可能是这个元素的子元素**。              |      | 否       |
| `mouseup`     | 在用户释放鼠标按钮时触发。                                                                                                                            |      | 否       |
| `contextmenu` | 在鼠标右键被按下时触发。还有其他打开上下文菜单的方式，例如使用特殊的键盘按键，在这种情况下它也会被触发，因此它并不完全是鼠标事件。                    |

## 事件顺序

```jsx
import React, { useRef } from 'react';
import styled from 'styled-components';

export default () => {
  const Container = styled.div`
    button + button {
      margin-left: 8px;
    }
  `;

  const PulsIcon = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
    position: relative;
    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
    }

    &::before {
      border-top: 1px solid;
      width: 100%;
      top: 50%;
    }
    &::after {
      height: 100%;
      border-left: 1px solid;
      left: 50%;
    }
  `;

  const onContextMenu = e => {
    console.log('contextmenu');
  };

  const onMouseEnter = e => {
    console.log('mouseenter');
  };

  const onMouseDown = e => {
    console.log('mousedown');
  };

  const onMouseUp = e => {
    console.log('mouseup');
  };

  const onClick = e => {
    console.log('click', e.button);
  };

  const onDoubleClick = e => {
    console.log('dblclick');
  };

  const onMouseMove = e => {
    console.log('mousemove');
  };

  const onMouseLeave = e => {
    console.log('mouseleave');
  };

  const onMouseOut = e => {
    console.log('mouseout');
  };

  return (
    <Container>
      <button
        onContextMenu={onContextMenu}
        onMouseEnter={onMouseEnter}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseMove={onMouseMove}
      >
        鼠标事件
      </button>
      <button onMouseDown={onMouseDown} onMouseUp={onMouseUp} onClick={onClick}>
        单击事件
      </button>
      <button
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onDoubleClick={onDoubleClick}
      >
        双击事件
      </button>
      <button onContextMenu={onContextMenu}>鼠标右键</button>
      <button onMouseLeave={onMouseLeave} onMouseOut={onMouseOut}>
        <PulsIcon /> 新增
      </button>
    </Container>
  );
};
```

#### mouseleave 和 mouseout 的区别

鼠标移入子元素时 `mouseout` 会触发 而 `mouseleave` 不会触发, 而鼠标移出时`mouseout` 和 `mouseleave` 都会触发

#### click 事件触发顺序

`mousedown` -> `mouseup` -> `click`

#### dbclick 事件触发顺序

`mousedown` -> `mouseup` -> `mousedown` -> `mouseup` -> `dbclick`

#### 如何在 `mousedown` 和 `mouseup` 中判断是按下鼠标的那个按键触发的

无论是按下鼠标左键还是鼠标右键都会触发 `mousedown` 和 `mouseup`

| 鼠标按键状态     | event.button |
| ---------------- | ------------ |
| 左键 (主要按键)  | 0            |
| 中键 (辅助按键)  | 1            |
| 右键 (次要按键)  | 2            |
| X1 键 (后退按键) | 3            |
| X2 键 (前进按键) | 4            |

```jsx
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState();

  const onMouseDown = e => {
    console.log('mousedown', e.button);
    setValue(e.button);
  };

  return (
    <div>
      <button onMouseDown={onMouseDown}>单击事件</button>
      <p>e.button: {value}</p>
    </div>
  );
};
```

## 组合键

- `shiftKey`：Shift
- `altKey`：Alt（或对于 Mac 是 Opt）
- `ctrlKey`：Ctrl
- `metaKey`：对于 Mac 是 Cmd

```js
const onClick = e => {
  const { shiftKey, ctrlKey, altKey, metaKey } = e;
};
```

```jsx
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState();

  const onClick = e => {
    const { shiftKey, ctrlKey, altKey, metaKey } = e;

    if (shiftKey) {
      console.log('按住 shift 键点击');
    }

    setValue({
      shiftKey,
      ctrlKey,
      altKey,
      metaKey,
    });
  };

  return (
    <div>
      <button onClick={onClick}>组合键</button>
      <p style={{ whiteSpace: 'pre' }}>{JSON.stringify(value, null, '\t')}</p>
    </div>
  );
};
```

## 坐标

所有的鼠标事件都提供了两种形式的坐标：

- 相对于窗口的坐标：clientX 和 clientY。
- 相对于文档的坐标：pageX 和 pageY。

```jsx
/**
 * title: 点击鼠标获取鼠标坐标
 */
import React, { useState, useEffect } from 'react';

export default () => {
  const [value, setValue] = useState();

  const onMouseMove = e => {
    const { clientX, clientY, pageX, pageY } = e;

    setValue({
      clientX,
      clientY,
      pageX,
      pageY,
    });
  };

  useEffect(() => {
    window.addEventListener('click', onMouseMove);

    return () => {
      window.removeEventListener('click', onMouseMove);
    };
  }, []);

  return (
    <div>
      <p style={{ whiteSpace: 'pre' }}>{JSON.stringify(value, null, '\t')}</p>
    </div>
  );
};
```

## 防止在鼠标按下时的选择

双击鼠标会产生选择文本的副作用。使用 `preventDefault`阻止默认行为来防止选择文本的副作用

```js
const onMouseDown = e => {
  e.preventDefault();
};
```

```jsx
/**
 * title: 用户体验
 * desc: 双击不会选择文本
 */
import React, { useState, useEffect } from 'react';

export default () => {
  const [value, setValue] = useState();

  const onMouseDown = e => {
    e.preventDefault();
  };

  return (
    <div>
      <p>双击会选择文本</p>
      <p onMouseDown={onMouseDown}>双击不会选择文本</p>
    </div>
  );
};
```

## 可选列表

创建一个可以选择元素的列表，例如在文件管理器中。

- 点击列表元素，只选择该元素（添加 .selected 类），取消选择其他所有元素。
- 如果点击时，按键 Ctrl（在 Mac 中为 Cmd）是被按下的，则选择会被切换到被点击的元素上，但其他元素不会被改动。

[原生类名操作](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)

```jsx
/**
 * title: 可选列表
 * desc: 点击类表单选， 按住 Control（Mac 为 Commond）点击时为多选
 */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .selected {
    background: #00ff00;
  }
`;

export default () => {
  const onClick = e => {
    const { target, metaKey, ctrlKey } = e;

    if (target.tagName != 'LI') {
      return;
    }

    const singleSelect = li => {
      const selected = document.querySelectorAll('.selected');
      for (let ele of selected) {
        ele.classList.remove('selected');
      }
      li.classList.add('selected');
    };

    const toggleSelect = li => {
      li.classList.toggle('selected');
    };

    if (ctrlKey || metaKey) {
      toggleSelect(target);
    } else {
      singleSelect(target);
    }
  };

  const onMouseDown = e => {
    e.preventDefault();
  };

  return (
    <Container>
      <p>Click on a list item to select it.</p>
      <ul onClick={onClick} onMouseDown={onMouseDown}>
        <li>Christopher Robin</li>
        <li>Winnie-the-Pooh</li>
        <li>Tigger</li>
        <li>Kanga</li>
        <li>Rabbit. Just rabbit.</li>
      </ul>
    </Container>
  );
};
```

## 移动鼠标

```jsx
/**
 * title: 用户体验
 * desc: 双击不会选择文本
 */
import React from 'react';

export default () => {
  const onMouseOver = e => {
    const { target, relatedTarget } = e;
    console.log('mouseover: ', { target, relatedTarget });
  };

  const onMouseOut = e => {
    const { target, relatedTarget } = e;
    console.log('mouseout: ', { target, relatedTarget });
  };

  return (
    <div>
      <p>双击会选择文本</p>
      <p onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        双击不会选择文本
      </p>
    </div>
  );
};
```
