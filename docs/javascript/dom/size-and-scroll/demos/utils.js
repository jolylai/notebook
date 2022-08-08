export function isInViewPortOfOne(el) {
  // viewPortHeight 兼容所有浏览器写法
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  const offsetTop = el.offsetTop;

  const scrollTop = document.documentElement.scrollTop;

  const top = offsetTop - scrollTop;

  return top <= viewPortHeight;
}

export function isInViewPortOfTwo(element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const { top, right, bottom, left } = element.getBoundingClientRect();

  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}

export function isInViewPort(el) {
  // viewPortHeight 兼容所有浏览器写法
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  const offsetTop = el.offsetTop;

  const scrollTop = document.documentElement.scrollTop;

  const top = offsetTop - scrollTop;

  return top <= viewPortHeight;
}
