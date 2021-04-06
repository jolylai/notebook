// onText: (text: string, e: Event) => void,
// onFiles: (files: File[], e: Event) => void,
// onUri: (uri: string, e: Event) => void,
// onDom: (content: any, e: Event) => void

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

function handleDrag(event) {
  // event.preventDefault();
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
      const dom = event.dataTransfer.getData('custom');
      if (dom && options.onDom) {
        options.onDom(dom, event);
      }
      const files = event.dataTransfer.files || [];
      if (files && files.length > 0 && options.onFiles) {
        options.onFiles(files, event);
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

    dragElements[i].addEventListener('dragstart', handleDrag, false);
    dragElements[i].addEventListener('drag', handleDrag, false);
    dragElements[i].addEventListener('dragend', handleDrag, false);
  }

  // drop
  const dropElement = document.querySelector('.drop');

  const dropHandler = createDropHandler(options);

  dropElement.addEventListener('dragenter', dropHandler, false);
  dropElement.addEventListener('dragover', dropHandler, false);
  dropElement.addEventListener('dragleave', dropHandler, false);
  dropElement.addEventListener('drop', dropHandler, false);
})();
