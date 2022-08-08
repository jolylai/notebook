const isLoaded = element => {
  element.getAttribute('data-loaded') === true;
};

const markAsLoaded = element => {
  element.setAttribute('data-loaded', true);
};

const load = element => {
  element.src = element.getAttribute('data-src');
};

const loaded = () => {};

const defaultOptions = {
  rootMargin: '0px',
  threshold: 0,
  load,
  loaded,
};

const getElements = (selector, root = document) => {
  if (selector instanceof Element) {
    return [selector];
  }

  if (selector instanceof NodeList) {
    return selector;
  }

  return root.querySelectorAll(selector);
};

const onIntersection = (load, loaded) => (entries, observer) =>
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0 || entry.isIntersecting) {
      observer.unobserve(entry.target);

      if (!isLoaded(entry.target)) {
        load(entry.target);
        markAsLoaded(entry.target);
        loaded(entry.target);
      }
    }
  });

export default function(selector = '.lazy', options) {
  const { root, rootMargin, threshold, load, loaded } = Object.assign(
    {},
    defaultOptions,
    options,
  );

  const observer = new IntersectionObserver(onIntersection(load, loaded), {
    root,
    rootMargin,
    threshold,
  });

  return {
    observe() {
      const elements = getElements(selector, root);

      for (let element of elements) {
        observer.observe(element);
      }
    },
  };
}
