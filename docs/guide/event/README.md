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
