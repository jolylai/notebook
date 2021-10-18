function css(el, prop, val) {
  var style = el && el.style;

  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, '');
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }

      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf('webkit') === -1) {
        prop = '-webkit-' + prop;
      }

      style[prop] = val + (typeof val === 'string' ? '' : 'px');
    }
  }
}

class Sortable {
  el;
  options;

  constructor(el, options) {
    this.el = el;
    this.options = options;
    this.addEventListeners(el);
  }

  addEventListeners(el) {
    for (let child of el.children) {
      child.draggable = true;

      child.addEventListener('dragstart', this.onDragStart);
      child.addEventListener('dragend', this.onDragEnd);
    }
  }

  onDragStart(event) {
    console.log('event: ', event.type);

    const element = event.target;
    const rec = element.getBoundingClientRect();

    const ghostElement = element.cloneNode(true);

    css(ghostElement, 'position', 'fixed');
    css(ghostElement, 'box-sizing', 'border-box');
    css(ghostElement, 'top', rec.top);
    css(ghostElement, 'left', rec.left);
    css(ghostElement, 'width', rec.width);
    css(ghostElement, 'height', rec.height);
    css(ghostElement, 'z-index', 99);
    css(ghostElement, 'pointerEvents', 'none');

    // this.parentElement.insertBefore(ghostElement, element);

    css(
      ghostElement,
      'transform-origin',
      (tapDistanceLeft / parseInt(ghostElement.style.width)) * 100 +
        '% ' +
        (tapDistanceTop / parseInt(ghostElement.style.height)) * 100 +
        '%',
    );

    // element.classList.add('list-item-drag');
  }

  onDragEnd(event) {
    console.log('event: ', event.type);
  }
}
