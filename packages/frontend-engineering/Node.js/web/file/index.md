---
title: 上传下载
---

```js
const mimeTypes = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  js: 'text/javascript',
  css: 'text/css',
  txt: 'text/plain',
};
```

## 文件下载

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(async (req, res) => {
  const filePath = path.resolve('assets/sample.png');

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', 'attachment; filename="filename.jpg"');

  res.statusCode = 200;
  fs.createReadStream(filePath).pipe(res);
});

server.listen(3000, () => {
  console.log(`server listen at http://localhost:3000`);
});
```

如果使用 `res.setHeader('Content-Disposition', 'attachment; filename="filename.jpg"');` 将 [Content-Disposition](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition) 设置为 `'attachment; filename="filename.jpg"'` 这可使用`<a download href="http://localhost:3000/download">H5 下载</a>` 下载图片

#### Reference

- [HTML5 中的 download 属性](https://www.zhangxinxu.com/wordpress/2016/04/know-about-html-download-attribute/)
- [axios](https://github.com/axios/axios/blob/master/lib/adapters/http.js)
- [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)
