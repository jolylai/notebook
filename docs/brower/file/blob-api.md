---
title: Blob API
order: 1
group:
  title: 文件
---

## 前言

**Blob（Binary Large Object）表示二进制类型的大对象**。Blob 通常是影像、声音或多媒体文件。在 JavaScript 中 Blob 类型的对象表示不可变的类似文件对象的原始数据。

Blob 由一个可选的字符串 type（通常是 [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)）和 blobParts 组成 —— 一系列其他 Blob 对象，字符串和 BufferSource。

<svg xmlns="http://www.w3.org/2000/svg" width="659" height="111" viewBox="0 0 659 111"><defs><style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:bold,italic,bolditalic%7CPT+Mono);@font-face{fontFamily:'PT Mono';fontWeight:700;font-style:normal;src:local('PT MonoBold'),url(/font/PTMonoBold.woff2) format('woff2'),url(/font/PTMonoBold.woff) format('woff'),url(/font/PTMonoBold.ttf) format('truetype')}</style></defs><g id="binary" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1"><g id="blob.svg"><path id="Rectangle-227" fill="#FFF9EB" stroke="#E8C48E" strokeWidth="2" d="M108 56h96v28h-96z"/><text id="image/png" fill="#000" fontFamily="PTMono-Regular, PT Mono" fontSize="16" fontWeight="normal"><tspan x="113.3" y="74">image/png</tspan></text><path id="Rectangle-227" fill="#FFF9EB" stroke="#E8C48E" strokeWidth="2" d="M238 56h71v28h-71z"/><text id="blob1" fill="#000" fontFamily="PTMono-Regular, PT Mono" fontSize="16" fontWeight="normal"><tspan x="250" y="74">blob1</tspan></text><path id="Rectangle-227-Copy" fill="#FFF9EB" stroke="#E8C48E" strokeWidth="2" d="M308 56h71v28h-71z"/><text id="blob2" fill="#000" fontFamily="PTMono-Regular, PT Mono" fontSize="16" fontWeight="normal"><tspan x="320" y="74">blob2</tspan></text><path id="Rectangle-227-Copy-3" fill="#FFF9EB" stroke="#E8C48E" strokeWidth="2" d="M475 56h71v28h-71z"/><text id="str" fill="#000" fontFamily="PTMono-Regular, PT Mono" fontSize="16" fontWeight="normal"><tspan x="497.1" y="74">str</tspan></text><path id="Rectangle-227-Copy-4" fill="#FFF9EB" stroke="#E8C48E" strokeWidth="2" d="M546 56h71v28h-71z"/><text id="buffer" fill="#000" fontFamily="PTMono-Regular, PT Mono" fontSize="16" fontWeight="normal"><tspan x="553.7" y="74">buffer</tspan></text><path id="Rectangle-227-Copy-2" fill="#FFF9EB" stroke="#E8C48E" strokeWidth="2" d="M379 56h96v28h-96z"/><text id="..." fill="#000" fontFamily="PTMono-Regular, PT Mono" fontSize="16" fontWeight="normal"><tspan x="413.1" y="74">...</tspan></text><text id="type" fill="#000" fontFamily="OpenSans-Regular, Open Sans" fontSize="20" fontWeight="normal"><tspan x="135.692" y="24">type</tspan></text><text id="Blob" fill="#000" fontFamily="OpenSans-Regular, Open Sans" fontSize="20" fontWeight="normal"><tspan x="24.823" y="76">Blob</tspan></text><text id="blobParts" fill="#000" fontFamily="OpenSans-Regular, Open Sans" fontSize="20" fontWeight="normal"><tspan x="378.21" y="24">blobParts</tspan></text><text id="+" fill="#D0021B" fontFamily="OpenSans-Regular, Open Sans" fontSize="20" fontWeight="normal"><tspan x="216.782" y="77">+</tspan></text><text id="=" fill="#D0021B" fontFamily="OpenSans-Regular, Open Sans" fontSize="20" fontWeight="normal"><tspan x="77.782" y="77">=</tspan></text><path id="Line-2" stroke="#EE6B47" strokeLinecap="square" strokeWidth="2" d="M239 45c81.34-6.667 143.674-10 187-10 43.326 0 105.66 3.333 187 10"/></g></g></svg>

```js
new Blob(blobParts, options);
```

- blobParts 是 Blob/BufferSource/String 类型的值的数组。
- options 可选对象：
  - type —— Blob 类型，通常是 MIME 类型，例如 image/png，
  - endings —— 是否转换换行符，使 Blob 对应于当前操作系统的换行符（\r\n 或 \n）。默认为 "transparent"（啥也不做），不过也可以是 "native"（转换）。

## Blob 用作 URL

对象 `URL` 有时候也称作 `Blob URL`，是指引用存储在 `File` 或 `Blob` 中数据的 `URL`。对象 `URL` 的优点是不用把文件内容读取到 `JavaScript` 也可以使用文件。只要在适当位置提供对象 URL 即可。要创建对象 URL，可以使用 `window.URL.createObjectURL()`方法并传入 `File` 或 `Blob` 对象。这个函数**返回的值是一个指向内存中地址的字符串**。因为这个字符串是 `URL`，所以可以在 `DOM` 中直接使用。

<Alert>
多亏了 type，让我们也可以下载/上传 Blob 对象，而在网络请求中，type 自然地变成了 Content-Type。
</Alert>

<code src='../../../demos/file/BlobURL.jsx' inline />

- 浏览器内部为每个通过 `URL.createObjectURL` 生成的 `URL` 存储了一个 URL → Blob 映射。因此，此类 `URL` 很短，但可以访问 `Blob`。
- `URL.revokeObjectURL(url)` 从内部映射中移除引用，因此允许 `Blob` 被删除（如果没有其他引用的话），并释放内存。

## Image 转换为 blob

<code src='../../../demos/file/ImageToBlob.jsx' inline />

1. 使用
2. 使用 [canvas.drawImage](https://developer.mozilla.org/zh-CN/docs/Web/api/CanvasRenderingContext2D/drawImage) 在 `canvas` 上绘制图像（或图像的一部分）。
3. 调用 `canvas` 方法 [.toBlob(callback, format, quality)](https://developer.mozilla.org/zh-CN/docs/Web/api/HTMLCanvasElement/toBlob) 创建一个 `Blob`，并在创建完成后使用其运行 `callback`。

#### 参考文章

- [存储引擎及如何选择合适的存储 API](https://github.com/Troland/how-javascript-works/blob/master/storage.md)
