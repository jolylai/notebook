---
title: document
order: 2
group:
  order: 30
---

`document` 对象是 HTMLDocument(继承自 Document 类型)的一个实例，表示整个 HTML 页面。而且，document 对象是 window 对象的一个 属性，因此可以将其作为全局对象来访问。Document 节点具有下列特征:

- nodeType 的值为 9;
- nodeName 的值为"#document";
- nodeValue 的值为 null;
- parentNode 的值为 null;
- ownerDocument 的值为 null;
- 其子节点可能是一个 DocumentType(最多一个)、Element(最多一个)、ProcessingInstruction
  或 Comment。

## 子节点

`document.documentElement` 始终指向 HTML 页面中的`<html>`元素。

`document` 对象还有一个 `body` 属性，直接指向`<body>`元素。因为 这个元素是开发者使用最多的元素，所以 `JavaScript` 代码中经常可以看到 `document.body`

## 文档信息

文档标题

```js
//取得文档标题
var originalTitle = document.title;
//设置文档标题
document.title = 'New page title';
```

`http://127.0.0.1:5500/index.html`

```js
//取得完整的 URL
var url = document.URL; // http://127.0.0.1:5500/index.html
//取得域名
var domain = document.domain; //127.0.0.1
//取得来源页面的 URL
var referrer = document.referrer; //  http://127.0.0.1:5500/index.html
```

## 查找元素

### getElementById

`getElementById()`，接收一个参数:要取得的元素的 ID。如果找到相应的元素则 返回该元素，如果不存在带有相应 ID 的元素，则返回 null。

<Alert>
这里的 ID 必须与页面中元素的 id 特性(attribute)严格匹配，包括大小写
</Alert>

### document.getElementsByTagName

```js
var images = document.getElementsByTagName('img');

alert(images.length); //输出图像的数量
alert(images[0].src); //输出第一个图像元素的 src 特性
alert(images.item(0).src); //输出第一个图像元素的 src 特性

var myImage = images.namedItem('myImage'); // 获取 name 属性为 myImage 的元素

var allElements = document.getElementsByTagName('*'); // 取得文档中的所有元素
```

### getElementsByName

这个方法会返回带有给定 `name` 特性的所有元素。

```html
<fieldset>
  <legend>Which color do you prefer?</legend>
  <ul>
    <li>
      <input type="radio" value="red" name="color" id="colorRed" />
      <label for="colorRed">Red</label>
    </li>
    <li>
      <input type="radio" value="green" name="color" id="colorGreen" />
      <label for="colorGreen">Green</label>
    </li>
    <li>
      <input type="radio" value="blue" name="color" id="colorBlue" />
      <label for="colorBlue">Blue</label>
    </li>
  </ul>
</fieldset>
```

```js
var radios = document.getElementsByName('color');
```

## 特殊集合

- `document.links`，包含文档中所有带 href 特性的`<a>`元素。
- `document.anchors`，包含文档中所有带 name 特性的`<a>`元素;
- `document.forms`，包含文档中所有的`<form>`元素，与 document.getElementsByTagName("form")
  得到的结果相同;
- `document.images`，包含文档中所有的`<img>`元素，与 document.getElementsByTagName("img")得到的结果相同;
