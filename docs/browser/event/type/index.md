---
title: 事件类型
---

- UI(User Interface，用户界面)事件，当用户与页面上的元素交互时触发;
- 焦点事件，当元素获得或失去焦点时触发;
- 鼠标事件，当用户通过鼠标在页面上执行操作时触发;
- 滚轮事件，当使用鼠标滚轮(或类似设备)时触发;
- 文本事件，当在文档中输入文本时触发;
- 键盘事件，当用户通过键盘在页面上执行操作时触发;
- 合成事件，当为 IME(Input Method Editor，输入法编辑器)输入字符时触发;
- 变动(mutation)事件，当底层 DOM 结构发生变化时触发。

## 用户界面事件

- `load`:当页面完全加载后在 window 上面触发，当所有框架都加载完毕时在框架集上面触发， 当图像加载完毕时在`<img>`元素上面触发，或者当嵌入的内容加载完毕时在`<object>`元素上面 触发。
- `unload`:当页面完全卸载后在 window 上面触发，当所有框架都卸载后在框架集上面触发，或 者当嵌入的内容卸载完毕后在`<object>`元素上面触发。
- `abort`:在用户停止下载过程时，如果嵌入的内容没有加载完，则在`<object>`元素上面触发。
- `error`:当发生 JavaScript 错误时在 window 上面触发，当无法加载图像时在`<img>`元素上面触 发，当无法加载嵌入内容时在`<object>`元素上面触发，或者当有一或多个框架无法加载时在框
  架集上面触发。第 17 章将继续讨论这个事件。
- `select`:当用户选择文本框`(<input>`或`<texterea>`)中的一或多个字符时触发。第 14 章将
  继续讨论这个事件。
- `resize`:当窗口或框架的大小变化时在 window 或框架上面触发。
- `scroll`:当用户滚动带滚动条的元素中的内容时，在该元素上面触发。`<body>`元素中包含所加

### load 事件

在 window 对象上，load 事件会在整个页面(包括所有外部资源如图片、JavaScript 文件和 CSS 文件)加载完成后触发。

<code src="./demos/LoadImage.jsx" inline />
 
使用 JavaScript 也可以为图片指定事件处理程序

```js
window.addEventListener('load', () => {
  let image = document.createElement('img');

  image.addEventListener('load', event => {
    console.log(event.target.src);
  });

  document.body.appendChild(image);

  image.src = 'https://picsum.photos/200';
});
```

<Alert>
下载图片并不一定要把 img 元素添加到文档，只要给它设置了 `src` 属性就会立即开始下载。
</Alert>

```html
<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0" />
<script>
  function ready() {
    const img = document.getElementById('img');

    // 此时图片已经加载完成
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

  window.addEventListener('load', ready, false);
</script>
```

可以像 `Image` 对象，只是不能把后者添加到 DOM 树。

```js
window.addEventListener('load', () => {
  let image = new Image();

  image.addEventListener('load', event => {
    console.log(event.target.src);
  });

  image.src = 'smile.gif';
});
```

有 的浏览器将 Image 对象实现为`<img>`元素，但并非所有浏览器都如此，所以最好将它们区别对待。

这里调用 Image 构造函数创建了一个新图片，并给它设置了事件处理程序。有些浏览器会把 Image 对象实现为`<img>` 元素，但并非所有浏览器都如此。所以最好把它们看成是两个东西。

动态创建的`<script>`元素指定事件处理程序

```js
window.addEventListener('load', () => {
  let script = document.createElement('script');
  script.addEventListener('load', event => {
    console.log('Loaded');
  });
  script.src = 'example.js';
  document.body.appendChild(script);
});
```

动态检测样式表是否加载完成

```js
window.addEventListener('load', () => {
  let link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.addEventListener('load', event => {
    console.log('css loaded');
  });
  link.href = 'example.css';
  document.getElementsByTagName('head')[0].appendChild(link);
});
```

### unload 事件

<code src='./demos/Unload.jsx' inline />

unload 事件会在文档卸载完成后触发。unload 事件一般是 在从一个页面导航到另一个页面时触发，最常用于清理引用，以避免内存泄漏。

```js
window.addEventListener('unload', event => {
  console.log('Unloaded!');
});
```

当访问者离开页面时，window 对象上的 unload 事件就会被触发。我们可以在那里做一些不涉及延迟的操作，例如关闭相关的弹出窗口。

假设我们收集有关页面使用情况的数据：鼠标点击，滚动，被查看的页面区域等。当用户要离开的时候，我们希望通过 unload 事件将数据保存到我们的服务器上。

```js
let analyticsData = {
  /* 带有收集的数据的对象 */
};

window.addEventListener('unload', function() {
  navigator.sendBeacon('/analytics', JSON.stringify(analyticsData));
});
```

`navigator.sendBeacon`在后台发送数据，转换到另外一个页面不会有延迟：浏览器离开页面，但仍然在执行 sendBeacon。

与 load 事件对应的是 unload 事件，这个事件在文档被完全卸载后触发。只要用户从一个页面切换到另一个页面，就会发生 unload 事件。而利用这个事件最多的情况是清除引用，以避免内存泄漏。

```js
window.onunload = function() {
  console.log('Loaded');
};
```

<Alert>
无论使用哪种方式，都要小心编写onunload事件处理程序中的代码。既然unload事件是在一切 都被卸载之后才触发，那么在页面加载后存在的那些对象，此时就不一定存在了。此时，操作 DOM 节 点或者元素的样式就会导致错误。
</Alert>

### beforeunload 事件

如果访问者触发了离开页面的导航（navigation）或试图关闭窗口，beforeunload 处理程序将要求进行更多确认。用意是给开发者提供阻止页面被卸载的机会。

<code src="./demos/BeforeUnload.jsx" inline />

```js
window.addEventListener('beforeunload', event => {
  let message = "I'm really going to miss you if you go.";
  event.returnValue = message;
  return message;
});
```

将 `event.returnValue` 设置为要在确认框中显示的字符串，并将其作为函数值返回

### resize 事件

<code src="./demos/Resize.jsx" inline />

当浏览器窗口被缩放到新高度或宽度时，会触发 resize 事件。

```js
window.addEventListener('resize', event => {
  console.log('Resized');
});
```

### scroll 事件

<code src="./demos/ScrollPage.jsx" />

在混杂模式下， 可以通过`<body>`元素检测 scrollLeft 和 scrollTop 属性的变化。而在标准模式下，这些变化在 `<html>`元素上。

```js
window.addEventListener('scroll', event => {
  if (document.compatMode == 'CSS1Compat') {
    console.log(document.documentElement.scrollTop);
  } else {
    console.log(document.body.scrollTop);
  }
});
```

scrollingElement 返回滚动文档的 Element 对象的引用。 在标准模式下, 这是文档的根元素, document.documentElement.当在怪异模式下， scrollingElement 属性返回 HTML body 元素（若不存在返回 null ）。所以可以直接使用 document.scrollingElement 就可以实现上面代码的效果

## 鼠标事件

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

### 双击

双击鼠标会产生选择文本的副作用。使用 `preventDefault`阻止默认行为来防止选择文本的副作用

<code src="./demos/MouseDoubleClick.jsx" inline />

```js
const onMouseDown = e => {
  e.preventDefault();
};
```

### 移动鼠标

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

### 坐标位置

<code src="./demos/MousePosition.jsx" />

| 参数    | 说明                   | 类型   |
| ------- | ---------------------- | ------ |
| screenX | 距离显示器左侧的距离   | number |
| screenY | 距离显示器顶部的距离   | number |
| clientX | 距离当前视窗左侧的距离 | number |
| clientY | 距离当前视窗顶部的距离 | number |
| pageX   | 距离完整页面顶部的距离 | number |
| pageY   | 距离完整页面顶部的距离 | number |

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
