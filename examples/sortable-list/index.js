let dragStartIndex;

const dragListItems = document.querySelectorAll('.draggable-list li');

function addEventListeners() {
  const draggableElements = document.querySelectorAll('[draggable=true]');

  for (let draggableElement of draggableElements) {
    draggableElement.addEventListener('dragstart', onDragStart, false);
    draggableElement.addEventListener('drag', onDrag, false);
    draggableElement.addEventListener('dragend', onDragEnd, false);
  }

  for (let element of dragListItems) {
    element.addEventListener('dragover', onDragOver);
    element.addEventListener('dragenter', onDragEnter);
    element.addEventListener('dragleave', onDragLeave);
    element.addEventListener('drop', onDrop);
  }
}

addEventListeners();

function onDragStart(event) {
  console.log(event.type, event);

  dragStartIndex = this.closest('[data-index]').getAttribute('data-index');
}

function onDrag(event) {
  event.preventDefault();
  // console.log(event.type, event);
}

function onDragEnd(event) {
  // console.log(event.type, event);
}

function onDragEnter(event) {
  event.preventDefault();
  const element = event.target;

  element.classList.add('list-item-over');
}

function onDragLeave(event) {
  const element = event.target;

  element.classList.remove('list-item-over');
}

function onDrop(event) {
  const element = event.target;
  element.classList.remove('list-item-over');

  const dragEndIndex = this.getAttribute('data-index');
  console.log('dragEndIndex: ', dragEndIndex);
  swap(dragStartIndex, dragEndIndex);
}

function onDragOver(event) {
  event.preventDefault();
}

// 互换位置
function swap(fromIndex, toIndex) {
  const formElement = dragListItems[fromIndex].querySelector(
    '.list-item-content',
  );
  const toElement = dragListItems[toIndex].querySelector('.list-item-content');

  dragListItems[fromIndex].appendChild(toElement);
  dragListItems[toIndex].appendChild(formElement);
}
