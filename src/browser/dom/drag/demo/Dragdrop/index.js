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
