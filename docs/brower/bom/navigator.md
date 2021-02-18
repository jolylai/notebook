---
title: navigator
order: 3
---

## 剪切板

<code src='../../../demos/bom/Clipboard.jsx' inline />

查看是否能够有读取剪贴板的权限

```js
const queryClipboardPermission = async () => {
  const result = await navigator.permissions.query({
    name: 'clipboard-read',
  });

  if (result.state === 'granted') {
    // 授权
  } else if (result.state === 'prompt') {
    // 询问
  } else if (result.state === 'denied') {
    // 未授权
  }

  console.log('result: ', result);
};
```

获取剪贴板内容

```js
const getClipboardText = async () => {
  const clipboardText = await navigator.clipboard.readText();

  return clipboardText;
};
```
