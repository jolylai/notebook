---
title: 文件下载
order: 4
---

## 检查是否支持跨域

<code src="./demo/CrosEnabled.jsx" inline />

使用同步请求检查 url 是否支持跨域

```js
export const crosEnabled = url => {
  const xhr = new XMLHttpRequest();

  xhr.open('HEAD', url, false);

  try {
    xhr.send();
  } catch (error) {}

  return xhr.status >= 200 && xhr.status <= 299;
};
```

## Blob 用作 URL

```js
const blobDownload = (blob, name) => {
  const a = document.createElement('a');
  a.download = name || 'download';
  a.rel = 'noopener';

  a.href = URL.createObjectURL(blob);

  setTimeout(() => {
    a.click();
  }, 0);

  setTimeout(() => {
    URL.revokeObjectURL(a.href);
  }, 40 * 1000);
};
```

## HTML5 下载

<code src="./demo/Download.jsx" inline />

检查浏览器是否支持 `download` 属性

```js
var isSupportDownload = 'download' in document.createElement('a');
```

HTML5 download 执行条件

1. 设置响应头 header("Content-Disposition: attachment; filename='download.jpg'");
2. 同一个域名下的资源
3. http only
4. 绝对路径/相对路径 都可以

前后端分离后，更多的情况下都是不在同一个域名下，如果请求的接口支持跨域则先请求

```js
const fetchBlobAndDownload = (url, name) => {
  const xhr = new XMLHttpRequest();

  xhr.open('get', url, true);

  xhr.responseType = 'blob';
  xhr.onerror = () => {
    console.error('Could not download file');
  };
  xhr.onload = () => {
    blobDownload(xhr.response, name);
  };

  xhr.send(null);
};
```

接口不支持跨域的话添加一个 `a.target = '_blank'`, 打开一个新的 tab 下载

#### Reference

- [HTML5 中的 download 属性](https://www.zhangxinxu.com/wordpress/2016/04/know-about-html-download-attribute/)
- [fileSaver](https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js)
