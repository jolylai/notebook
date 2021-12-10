---
title: 鼠标事件
---

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

### mouseleave 和 mouseout 的区别

鼠标移入子元素时 `mouseout` 会触发 而 `mouseleave` 不会触发, 而鼠标移出时`mouseout` 和 `mouseleave` 都会触发

### click 事件触发顺序

`mousedown` -> `mouseup` -> `click`

### dbclick 事件触发顺序

`mousedown` -> `mouseup` -> `mousedown` -> `mouseup` -> `dbclick`

### 如何在 `mousedown` 和 `mouseup` 中判断是按下鼠标的那个按键触发的

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

## 修饰键

<code src='./demos/ComposeKey.jsx' inline />

键盘上的修饰键 `Shift`、`Ctrl`、`Alt` 和 `Meta` 经常用于修改鼠标事件的行为。这几个修饰键的状态:`shiftKey`、`ctrlKey`、`altKey` 和 `metaKey`。这几属性会在各自对应的修饰 键被按下时包含布尔值 true，没有被按下时包含 false。

- `shiftKey`：Shift
- `altKey`：Alt（或对于 Mac 是 Opt）
- `ctrlKey`：Ctrl
- `metaKey`：对于 Mac 是 Cmd

```js
let div = document.getElementById('myDiv');

div.addEventListener('click', event => {
  let keys = [];

  if (event.shiftKey) {
    keys.push('shift');
  }
  if (event.ctrlKey) {
    keys.push('ctrl');
  }
  if (event.altKey) {
    keys.push('alt');
  }
  if (event.metaKey) {
    keys.push('meta');
  }
  console.log('Keys: ' + keys.join(','));
});
```

创建一个可以选择元素的列表，例如在文件管理器中。

- 点击列表元素，只选择该元素（添加 .selected 类），取消选择其他所有元素。
- 如果点击时，按键 Ctrl（在 Mac 中为 Cmd）是被按下的，则选择会被切换到被点击的元素上，但其他元素不会被改动。

[原生类名操作](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)

<code src="./demos/SelectableList.jsx" />

## 双击

双击鼠标会产生选择文本的副作用。使用 `preventDefault`阻止默认行为来防止选择文本的副作用

<code src="./demos/MouseDoubleClick.jsx" inline />

```js
const onMouseDown = e => {
  e.preventDefault();
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

<code src="./demos/MousePosition.jsx" />

| 参数    | 说明                   | 类型   |
| ------- | ---------------------- | ------ |
| screenX | 距离显示器左侧的距离   | number |
| screenY | 距离显示器顶部的距离   | number |
| clientX | 距离当前视窗左侧的距离 | number |
| clientY | 距离当前视窗顶部的距离 | number |
| pageX   | 距离完整页面顶部的距离 | number |
| pageY   | 距离完整页面顶部的距离 | number |

## 焦点事件

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
