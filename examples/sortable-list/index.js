function Sortable(el, options) {
  this.el = el;
  this.options = options;
  this.addEventListeners(el);
}

Sortable.prototype.onDragStart = function(event) {
  console.log('event: ', event.type);

  const element = event.target;
  const rec = element.getBoundingClientRect();
  console.log('rec: ', rec);

  const ghostElement = element.cloneNode(true);

  ghostElement.style = `position: fixed; top: ${rec.top};left: ${rec.left};width: ${rec.width};height: ${rec.height}`;

  this.parentElement.insertBefore(ghostElement, element);

  console.log('this', this);

  element.classList.add('list-item-drag');
};

Sortable.prototype.onClick = function(event) {
  console.log('event: ', event.type);
};

Sortable.prototype.addEventListeners = function(el) {
  for (let child of el.children) {
    // child.addEventListener('click', this.onClick);
    child.draggable = true;

    child.addEventListener('dragstart', this.onDragStart);
  }
};
