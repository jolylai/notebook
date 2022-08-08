export default function loadScript(src, props) {
  let script = document.querySelector(`script[src="${src}"]`);

  if (script) {
    return script;
  }

  script = document.createElement('script');
  script.src = src;

  const handler = event => {
    const scriptStatus = event.type === 'load' ? 'ready' : 'error';
    script.setAttribute('data-status', scriptStatus);
  };

  script.addEventListener('load', handler, false);
  script.addEventListener('error', handler, false);

  document.body.appendChild(script);

  return script;
}

loadScript('https://ahooks.gitee.io/useExternal/test-external-script.js');
const script = loadScript(
  'https://ahooks.gitee.io/useExternal/test-external-script.js',
);

script.remove();
