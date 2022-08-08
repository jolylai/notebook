function loadScript(path, props = {}) {
  const script = document.querySelector(`script[src="${path}"]`);

  if (!script) {
    const newScript = document.createElement('script');

    newScript.src = path;

    // 会遍历 props 原型链
    for (const ken in props) {
      newScript[key] = props[key];
    }

    newScript.setAttribute('data-status', 'loading');
    document.body.appendChild(newScript);

    return newScript;
  }

  return script;
}

const scripts = loadScript(
  'https://ahooks.gitee.io/useExternal/test-external-script.js',
);
console.log('scripts: ', scripts);

function useExternal(path, options) {}
