---
title: 鼠标事件
---

## 鼠标事件

### 事件类型

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

## 事件顺序

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

### 修饰键

<code src='./demos/ComposeKey.jsx' inline />

键盘上的修饰键 Shift、Ctrl、Alt 和 Meta 经常用于修改鼠标事件的行为。这几个修饰键的状态:shiftKey、ctrlKey、altKey 和 metaKey。这几属性会在各自对应的修饰 键被按下时包含布尔值 true，没有被按下时包含 false。

- `shiftKey`：Shift
- `altKey`：Alt（或对于 Mac 是 Opt）
- `ctrlKey`：Ctrl
- `metaKey`：对于 Mac 是 Cmd

```js
let div = document.getElementById('myDiv');

div.addEventListener('click', event => {
  const { shiftKey, ctrlKey, altKey, metaKey } = e;
});
```

创建一个可以选择元素的列表，例如在文件管理器中。

- 点击列表元素，只选择该元素（添加 .selected 类），取消选择其他所有元素。
- 如果点击时，按键 Ctrl（在 Mac 中为 Cmd）是被按下的，则选择会被切换到被点击的元素上，但其他元素不会被改动。

[原生类名操作](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)

<code src="./demos/SelectableList.jsx" />

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

## 坐标位置

- 相对于窗口的坐标：clientX 和 clientY。
- 相对于文档的坐标：pageX 和 pageY。
- 相对于屏幕：clientX 和 client

### 客户区坐标位置

<code src="./demos/Coordinates.jsx" />

`event` 对象的 `clientX` 和 `clientY` 属性中。这两个属性表示事件发生时鼠标光标在视口中的坐标位置

```js
document.body.onclick = function(event) {
  const { clientX, clientY } = event;
  console.log('Client Coordinates', clientX, clientY);
};
```

这些值中不包括页面滚动的距离，因此这个位置并不表示鼠标在页面上的位置。

### 页面坐标位置

通过客户区坐标能够知道鼠标是在视口中什么位置发生的，而页面坐标通过事件对象的 pageX 和 pageY 属性，能告诉你事件是在页面中的什么位置发生的。换句话说，这两个属性表示鼠标光标在页面中的位置，因此坐标是从页面本身而非视口的左边和顶边计算的。

```js
document.body.onclick = function(event) {
  const { pageX, pageY } = event;
  console.log('Page Coordinates', pageX, pageY);
};
```

在页面没有滚动的情况下，pageX 和 pageY 的值与 clientX 和 clientY 的值相等。

```js
document.body.onclick = function(event) {
  let { pageX, pageY } = event;
  if (pageX === undefined) {
    const scrollLeft =
      document.body.scrollLeft || document.documentElement.scrollLeft;
    pageX = event.clientX + scrollLeft;
  }

  if (pageY === undefined) {
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    pageY = event.clientY + scrollTop;
  }
  console.log('Page coordinates: ' + pageX + ',' + pageY);
};
```

### 屏幕坐标位置

鼠标事件发生时，不仅会有相对于浏览器窗口的位置，还有一个相对于整个电脑屏幕的位置。而通 过 screenX 和 screenY 属性就可以确定鼠标事件发生时鼠标指针相对于整个屏幕的坐标信息。

```js
document.body.onclick = function(event) {
  const { screenX, screenY } = event;
  console.log('Screen Coordinates', screenX, screenY);
};
```
