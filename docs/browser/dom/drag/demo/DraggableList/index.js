function bindEvent(node) {
  node.setAttribute('draggable', true);

  // 被拖拽元素
  node.addEventListener('dragstart', onDragStart, false);
  node.addEventListener('drag', onDrag, false);
  node.addEventListener('dragend', onDragEnd, false);

  // 放置元素
  node.addEventListener('dragenter', onDragEnter, false);
  node.addEventListener('dragover', onDragOver, false);
  node.addEventListener('dragleave', onDragLeave, false);
  node.addEventListener('drop', onDrop, false);
}

let dragTarget, dropTarget;

/**
 * 交换两个节点
 * @param {HTMLElement} node1
 * @param {HTMLElement} node2
 */
function swap(node1, node2) {
  const afterNode2 = node2.nextElementSibling;
  const parent = node2.parentNode;
  node1.replaceWith(node2);
  parent.insertBefore(node1, afterNode2);
}

/**
 * 开始拖拽
 * @param {*} event
 */
function onDragStart(event) {
  console.log(event.type, event);
}

/**
 * 拖拽中 持续执行
 */
function onDrag(event) {
  event.preventDefault();
  const { target } = event;
  dragTarget = target;
  // console.log(event.type, event);
}

/**
 * 拖拽结束
 */
function onDragEnd(event) {
  console.log(event.type, event);
}

/**
 * 进入可放置元素
 */
function onDragEnter(event) {
  event.preventDefault();

  console.log(event.type, event);
}

/**
 * 在放置元素中移动 持续触发
 */
function onDragOver(event) {
  event.preventDefault();

  // console.log(event.type, event);
}

/**
 * 移出可放置元素
 */
function onDragLeave(event) {
  event.preventDefault();

  console.log(event.type, event);
}

/**
 * 在放置元素中停止拖拽
 */
function onDrop(event) {
  console.log(event.type, event);

  const { target, dataTransfer } = event;
  console.log('dataTransfer: ', dataTransfer.getData('text/plain'));
  dropTarget = target;

  swap(dragTarget, dropTarget);
}

function handleDragFile(event) {
  event.preventDefault();
  if (event.type === 'drop') {
    // 遍历文件信息
    const files = event.dataTransfer.files || [];
    console.log('files: ', files);
  }
}

(function() {
  const items = document.querySelectorAll('.list-group-item');

  for (let i = 0; i < items.length; i++) {
    bindEvent(items[i]);
  }

  // 拖拽文件
  const fileContainer = document.querySelector('.container.container-file');

  fileContainer.addEventListener('drop', handleDragFile, false);
  fileContainer.addEventListener('dragenter', handleDragFile, false);
  fileContainer.addEventListener('dragover', handleDragFile, false);
})();
