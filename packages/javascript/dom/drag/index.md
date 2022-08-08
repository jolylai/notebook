---
title: 原生拖放
---

## 前言

### 被拖拽元素

默认情况下，`图像`、`链接`和`文本`是可以拖动的，也就是说，不用额外编写代码，用户就可以拖动它们。文本只有在被选中的情况下才能拖动，而图像和链接在任何时候都可以拖动。

<code src='./demos/DraggableElement.jsx' inline />

图像和链接的 `draggable` 属性自动被设置成了 `true`，而其他元素这个属性的默认值都是 `false`。要想让其他元素可拖动，或者让图像或链接不能拖动，都可以设置这个属性。

```html
<!-- 让这个图像不可以拖动 -->
<img src="smile.gif" draggable="false" alt="Smiley face" />

<!-- 让这个元素可以拖动 -->
<div draggable="true">...</div>
```

拖动某元素时，将依次触发 下列事件: `dragstart -> drag -> dragend`

```js
const dragElement = document.getElementById('dragElement');

function onDragStart(event) {
  console.log(event.type, event);
}

function onDrag(event) {
  event.preventDefault();
  console.log(event.type, event);
}

function onDragEnd(event) {
  console.log(event.type, event);
}

dragElement.addEventListener('dragstart', onDragStart, false);
dragElement.addEventListener('drag', onDrag, false);
dragElement.addEventListener('dragend', onDragEnd, false);
```

- dragstart: 按下鼠标键并开始移动鼠标时，会在被拖放的元素上触发 dragstart 事件。
- drag: 触发 dragstart 事件后，随即会触发 drag 事件，而且在元素被拖动期间会持续触发该事件。
- dragend: 当拖动停止时(无 论是把元素放到了有效的放置目标，还是放到了无效的放置目标上)，会触发 dragend 事件。

返回给定类型的数据，如果该类型的数据不存在或数据传输不包含数据，则返回空字符串。

`DataTransfer.setData(format, data)`

设置给定类型的数据。如果该类型的数据不存在，则在末尾添加，以使列表中的最后一项成为新格式类型。如果该类型的数据已存在，则在相同位置把现有数据替换掉。

`DataTransfer.setDragImage(img, xOffset, yOffset)`

设置用于拖动的自定义图像。

`DataTransfer.clearData([format])`

删除与给定类型关联的数据。format 参数是可选的。如果类型为空或未指定，则删除所有关联的数据。如果指定类型的数据不存在，或者数据传输不包含任何数据，则此方
法无效。

### 目标元素

当某个元素被拖动到一个有效的放置目标上时，下列事件会依次发生: `dragenter -> dragover -> dragleave 或 drop`

- `dragenter`: 只要有元素被拖动到放置目标上，就会触发 `dragenter` 事件(类似于 mouseover 事件)。
- `dragover`: 在被拖动的元素还在放置目标的范围内移动时，就会持续触发该事件。
- `dragleave` 或 `drop` :如 `果元素被拖出了放置目标，dragover` 事件不再发生，但会触发 `dragleave` 事件(类似于 mouseout 事件)。如果元素被放到了放置目标中，则会触发 `drop` 事件而不是 `dragleave` 事件。

虽然所有元素都支持放置目标事件，但这些**元素默认是不允许放置的**。

**如果拖动元素经过不允许放置的元素，无论用户如何操作，都不会发生 `drop` 事件。** 不过，你可以把任何元素变成有效的放置 目标，方法是重写 dragenter 和 dragover 事件的默认行为。

```js
const dropElement = document.querySelector('.dropElement');

//  进入可放置元素
function onDragEnter(event) {
  event.preventDefault();

  console.log(event.type, event);
}

// 在放置元素中移动 持续触发
function onDragOver(event) {
  event.preventDefault();

  // console.log(event.type, event);
}

//  移出可放置元素
function onDragLeave(event) {
  event.preventDefault();

  console.log(event.type, event);
}

// 在放置元素中停止拖拽

function onDrop(event) {
  console.log(event.type, event);
}

dropElement.addEventListener('dragenter', onDragEnter, false);
dropElement.addEventListener('dragover', onDragOver, false);
dropElement.addEventListener('dragleave', onDragLeave, false);
dropElement.addEventListener('drop', onDrop, false);
```

`event.preventDefault()`重写 `dragenter` 和 `dragover` 事件的默认行为,不然无论用户如何操作，都不会发生 `drop` 事件。

## 拖拽内容

<code src="./demos/DataTransferItem.jsx" inline />

`DataTransfer.types`（只读）

在 dragstart 事件中设置数据格式，返回的是一个字符串数组。

DataTransfer 对象出现在拖拽事件中，具体包括开始拖拽 dragstart 事件，拖拽进入 dragenter 事件，拖拽离开 dragleave 事件，拖拽经过 dragover 事件，拖拽释放 drop 事件以及拖拽结束 dragend 事件。

在拖动文本框中的文本时，浏览器会调用 `setData()`方法，将拖动的文本以`"text"`格式保存在 `dataTransfer` 对象中。类似地，在拖放链接或图像时，会调用 `setData()`方法并保存 `URL`。然后， 在这些元素被拖放到放置目标时，就可以通过 `getData()`读到这些数据。

dataTransfer 对象可以为每种 MIME 类型都保存一个值。换句话说，同时在这个对象中保存一段文本和一个 URL 不会有任何问题。

### DataTransfer.items

DataTransfer.items 可以用来获取拖拽的数据信息。

```js
const handleDrop = event => {
  event.preventDefault();

  const items = event.dataTransfer.items;

  for (let item of items) {
    const { type, kind } = item;
    console.log(`kind: ${kind}, type: ${type}`);

    if (kind === 'string') {
      if (type.indexOf('text/plain') != -1) {
        item.getAsString(function(str) {
          // str是纯文本
        });
      }
      if (type.indexOf('text/html') != -1) {
        item.getAsString(function(str) {
          // str是富文本
        });
      }
      if (type.indexOf('text/uri-list') != -1) {
        item.getAsString(function(str) {
          // str是uri地址
        });
      }
    }

    // 文件类型
    if (kind === 'file') {
      // 如果是图片
      if (type.indexOf('image/') != -1) {
        const file = items.getAsFile();
        // file就是图片文件对象，可以上传，或者其他处理
      }
    }
  }
};
```

### DataTransfer.getData()

```js
const dropElement = document.getElementById('dropElement');

dropElement.addEventListener('drop', () => {
  // 拖拽文字
  const text = event.dataTransfer.getData('text/plain');
  // 拖拽链接
  const url = event.dataTransfer.getData('text/uri-list');
  // 获取拖拽富文本内容
  const html = event.dataTransfer.getData('text/html');
});
```

### 自定义拖拽内容

<code src="./demos/CustomDropData.jsx" inline />

```js
// 被拖拽元素
const dragElements = document.querySelectorAll('.list-group-item');

dragElements.forEach(item => {
  item.setAttribute('draggable', true);

  // 可以在 dragstart 事件处理程序中调用 setData()，手工保存自己要传输的数据，以便将来使用。
  item.ondragstart = function(event) {
    //设置和接收文本数据
    event.dataTransfer.setData('text', 'some text');
    //设置和接收 URL
    event.dataTransfer.setData('URL', 'http://www.wrox.com/');
  };
});

// 目标元素
const dropElement = document.querySelector('.dropElement');

dropElement.ondragenter = function(event) {
  event.preventDefault();
};

/**
 * 保存在 dataTransfer 对象中的数据只能在 drop 事件处理程序中读取。
 * 如果在 ondrop 处理程序中没有读到数据，那就是 dataTransfer 对象已经被销毁，数据也丢失了。
 */
dropElement.ondrop = function(event) {
  const text = event.dataTransfer.getData('text');
  const url = event.dataTransfer.getData('URL');
};
```

HTML5 则对此加以扩展，允许指定各种 MIME 类型。考虑到向后兼容，HTML5 也支持`"text"`和`"URL"`，但这两种类型会被映射为`"text/plain"`和 `"text/uri-list"`。

```js
dropElement.ondrop = function(event) {
  const text = event.dataTransfer.getData('text/plain');
  const url = event.dataTransfer.getData('text/uri-list');
};
```

### 拖拽文件

<code src="./demos/DataTransferFiles.jsx" inline />

拖拽的本地文件列表。如果拖动操作不涉及拖动文件，则此属性为空列表。

```html
<div class="container container-file">
  <h4>拖拽文件到此区域</h4>
</div>
```

```js
const fileContainer = document.querySelector('.container.container-file');

fileContainer.addEventListener('drop', handleDragFile, false);
fileContainer.addEventListener('dragenter', handleDragFile, false);
fileContainer.addEventListener('dragover', handleDragFile, false);

function handleDragFile(event) {
  event.preventDefault();
  if (event.type === 'drop') {
    // 遍历文件信息
    const files = event.dataTransfer.files || [];
    console.log('files: ', files);
  }
}
```

<!--
```js
function createDragHandler(data) {
  function handleDrag(event) {
    if (event.type === 'dragstart') {
      event.dataTransfer.setData('custom', data);
    }
  }

  return handleDrag;
}

function createDropHandler(options) {
  function handleDrop(event) {
    event.preventDefault();
    if (event.type === 'drop') {
      // 拖拽链接的回调
      const uri = event.dataTransfer.getData('text/uri-list');
      if (uri && options.onUri) {
        options.onUri(uri, event);
      }

      // 拖拽自定义 dom 节点的回调
      const dom = event.dataTransfer.getData('custom');
      if (dom && options.onDom) {
        options.onDom(dom, event);
      }

      // 拖拽文件的回调
      const files = event.dataTransfer.files || [];
      if (files && files.length > 0 && options.onFiles) {
        options.onFiles(files, event);
      }

      // 	拖拽文字的回调
      const items = event.dataTransfer.items;
      if (items && items.length && options.onText) {
        items[0].getAsString(text => {
          options.onText(text, event);
        });
      }
    }
  }

  return handleDrop;
}

(function() {
  // drag
  const dragElements = document.querySelectorAll('.drag');

  for (let i = 0; i < dragElements.length; i++) {
    dragElements[i].setAttribute('draggable', true);

    const dragHandler = createDragHandler('custom data');
    dragElements[i].addEventListener('dragstart', dragHandler, false);
    dragElements[i].addEventListener('drag', dragHandler, false);
    dragElements[i].addEventListener('dragend', dragHandler, false);
  }

  // drop
  const options = {
    // 	拖拽文字的回调
    onText(text, event) {
      console.log('onText', { text, event });
    },
    // 拖拽文件的回调
    onFiles(files, event) {
      console.log('onFiles', { files, event });
    },
    // 拖拽链接的回调
    onUri(text, event) {
      console.log('onUri', { text, event });
    },
    // 拖拽自定义 dom 节点的回调
    onDom(content, event) {
      console.log('onDom', { content, event });
    },
  };

  const dropElement = document.querySelector('.drop');

  const dropHandler = createDropHandler(options);

  dropElement.addEventListener('dragenter', dropHandler, false);
  dropElement.addEventListener('dragover', dropHandler, false);
  dropElement.addEventListener('dragleave', dropHandler, false);
  dropElement.addEventListener('drop', dropHandler, false);
  dropElement.addEventListener('paste', dropHandler, false);
})();
``` -->

## 拖拽排序

<code src='./demos/DraggableList.jsx' inline />

#### Reference

- [DataTransfer 对象](https://www.zhangxinxu.com/wordpress/2018/09/drag-drop-datatransfer-js/)
- [Sortable](https://github.com/SortableJS/Sortable)
- [File](https://developer.mozilla.org/zh-CN/docs/Web/API/File)接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。
