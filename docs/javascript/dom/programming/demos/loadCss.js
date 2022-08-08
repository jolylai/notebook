export default function loadCss(href) {
  let css = document.querySelector(`link[href="${href}"]`);

  if (css) return css;

  css = document.createElement('link');
  css.rel = 'stylesheet';
  css.type = 'text/css';
  css.href = href;

  css.setAttribute('data-status', 'loading');

  const handler = event => {
    const cssStatus = event.type === 'load' ? 'ready' : 'error';
    css.setAttribute('data-status', cssStatus);
  };

  css.addEventListener('load', handler, false);
  css.addEventListener('error', handler, false);

  document.body.appendChild(css);

  return css;
}

loadCss('https://ahooks.gitee.io/useExternal/bootstrap-badge.css');
