---
title: 节点
order: 1
---

<code src="./demos/Node.jsx" />

## 节点类型

`JavaScript` 中的所有节点类型都继承自 `Node` 类型，因此所有节点类型都共享着相同的基本属性和方法。每个节点都有一个 `nodeType` 属性，用于表明节点的类型。

- Node.ELEMENT_NODE(1) 元素节点;
- Node.ATTRIBUTE_NODE(2);
- Node.TEXT_NODE(3) 文本节点;
- Node.CDATA_SECTION_NODE(4);
- Node.ENTITY_REFERENCE_NODE(5);
- Node.ENTITY_NODE(6);
- Node.PROCESSING_INSTRUCTION_NODE(7);
- Node.COMMENT_NODE(8);
- Node.DOCUMENT_NODE(9);
- Node.DOCUMENT_TYPE_NODE(10);
- Node.DOCUMENT_FRAGMENT_NODE(11);
- Node.NOTATION_NODE(12)。

判断节点类型

```js
const btn = document.getElementById('btn');

// IE 无效
if (btn.nodeType === Node.ELEMENT_NODE) {
  console.log('Node is a Element');
}

//适用于所有浏览器
if (btn.nodeType === 1) {
  console.log(btn.nodeName); // BUTTON
  console.log(btn.nodeValue); // null
  console.log('Node is a Element');
}
```

对于元素节点，nodeName 中保存的始终都是元素的标签名，而 nodeValue 的值则始终为 null。

## 创建节点

### createElement

创建新元素，接受一个参数，即要创建元素的标签名

```js
const divEl = document.createElement('div');
divEl.innerText = 'div';
```

### createTextNode

创建一个文本节点

```js
const textEl = document.createTextNode('content');
```

### createDocumentFragment

用来创建一个文档碎片，它表示一种轻量级的文档，主要是用来存储临时节点，然后把文档碎片的内容一次性添加到 DOM 中

```js
const fragment = document.createDocumentFragment();
```

当请求把一个 DocumentFragment 节点插入文档树时，插入的不是 DocumentFragment 自身，而是它的所有子孙节点

### createAttribute

创建属性节点，可以是自定义属性

```js
const dataAttribute = document.createAttribute('custom');
consle.log(dataAttribute);

dataAttribute.value = 'newVal';

var node = document.getElementById('div1');
node.setAttributeNode(dataAttribute);

console.log(node.getAttribute('my_attrib')); // "newVal"
```

## 获取节点

### querySelector

传入任何有效的 css 选择器，即可选中单个 DOM 元素（首个）：

```js
document.querySelector('.element');
document.querySelector('#element');
document.querySelector('div');
document.querySelector('[name="username"]');
document.querySelector('div + p > span');
```

如果页面上没有指定的元素时，返回 null

### querySelectorAll

返回一个包含节点子树内所有与之相匹配的 Element 节点列表，如果没有相匹配的，则返回一个空节点列表

```js
const notLive = document.querySelectorAll('p');
```

需要注意的是，该方法返回的是一个 NodeList 的静态实例，它是一个静态的“快照”，而非“实时”的查询

```js
// 返回拥有指定id的对象的引用
document.getElementById('id属性值');
// 返回拥有指定class的对象集合
document.getElementsByClassName('class属性值');
// 返回拥有指定标签名的对象集合
document.getElementsByTagName('标签名');
// 返回拥有指定名称的对象结合
document.getElementsByName('name属性值');
// 仅返回第一个匹配的元素
document / element.querySelector('CSS选择器');
// 返回所有匹配的元素
document / element.querySelectorAll('CSS选择器');
// 获取页面中的HTML标签
document.documentElement;
// 获取页面中的BODY标签
document.body;
// 获取页面中的所有元素节点的对象集合型
document.all[''];
```

### 子节点

NodeList 是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。可以通过方括号，也可以使用 `item()` 方法。

```js
const btn = document.getElementById('btn');

const firstChild = btn.childNodes[0];
const secondChild = btn.childNodes.item(1);
const count = btn.childNodes.length;
```

判断是否含有子节点

```js
const btn = document.getElementById('btn');
btn.hasChildNodes();
```

NodeList 对象转换为数组

```js
const arrayOfNodes = Array.prototype.slice.call(someNode.childNodes, 0);

let arrayOfNodes = Array.from(someNode.childNodes);
```

### 父节点

```js
const btn = document.getElementById('btn');

const parentNode = btn.parentNode;
```

这种关系表示的是任何节点都属于它所在的文档，任何节点都不能同时存在于两个或更多个文档中。通过`ownerDocument`属性，我们可以不必在节点层次中通过层层回溯到达顶端，而是可以直接访问文档节点。

```js
const btn = document.getElementById('btn');

const ownerDocument = btn.ownerDocument; // document
```

### 兄弟节点

```js
const btn = document.getElementById('btn');

// btn 前一个兄弟节点
const previousSibling = btn.previousSibling; // #text

// btn 后一个兄弟节点
const nextSibling = btn.nextSibling; // #text
```

列表中第一个节点的 previousSibling 属性 值为 null，而列表中最后一个节点的 nextSibling 属性的值同样也为 null

`ownerDocument` 属性是一个指向代表整个文档的文档节点 的指针。所有节点都被创建它们(或自己所在)的文档所拥有，因为一个节点不可能同时存在于两个或者多个文档中。这个属性为迅速访问文档节点提供了便利，因为无需在文档结构中逐层上溯了。

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/node-relation.png)

## 新增节点

### appendChild

向 `childNodes` 列表的末尾添加一个节点。添加新节点会更新相关的关系指针，包括父节点和之前的最后一个子节点。`appendChild()`方法返回新添加的节点，

```js
const li4 = document.createElement('li');
li4.innerText = 4;

list.appendChild(li4);
```

如果传入到 `appendChild()` 中的节点已经是文档的一部分了，那结果就是将该节点从原来的位置转移到新位置。

```js
// 将 ul 中的第一个 li 放到 ul 的最后一个
const ul = document.getElementById('ul');
const firstChild = ul.firstElementChild;
ul.appendChild(firstChild);
```

### insertBefore

如果需要把节点放在 `childNodes` 列表中某个特定的位置上，而不是放在末尾，那么可以使用 `insertBefore()`方法。这个方法接受两个参数:要插入的节点和作为参照的节点。插入节点后，被插入的节点会变成参照节点的前一个同胞节点(previousSibling)，同时被方法返回。

```js
const list = document.getElementById('list');

const newChild = document.createElement('li');
newChild.innerText = '新增';

list.insertBefore(newChild, list.firstChild);
```

如果参照节点是 `null`，则 `insertBefore()` 与 `appendChild()` 执行相同的操作

```js
const list = document.getElementById('list');

const newChild = document.createElement('li');
newChild.innerText = '新增';

list.insertBefore(newChild, null);
```

## 更新节点

### innerHTML

如果这个 DOM 节点是空的，例如，`<div></div>`，那么，直接使用`innerHTML = '<span>child</span>'`就可以修改 DOM 节点的内容，相当于添加了新的 DOM 节点

如果这个 DOM 节点不是空的，那就不能这么做，因为 innerHTML 会直接替换掉原来的所有子节点

### innerText

自动对字符串进行 HTML 编码，保证无法设置任何 HTML 标签

```js
// 获取<p id="p-id">...</p >
var p = document.getElementById('p-id');
// 设置文本:
p.innerText = '<script>alert("Hi")</script>';
// HTML被自动编码，无法设置一个<script>节点:
// <p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p >
```

两者的区别在于读取属性时，innerText 不返回隐藏元素的文本，而 textContent 返回所有文本

### style

DOM 节点的 style 属性对应所有的 CSS，可以直接获取或设置。遇到-需要转化为驼峰命名

```js
// 获取<p id="p-id">...</p >
const p = document.getElementById('p-id');
// 设置CSS:
p.style.color = '#ff0000';
p.style.fontSize = '20px'; // 驼峰命名
p.style.paddingTop = '2em';
```

### setAttribute

在指定元素中添加一个属性节点，如果元素中已有该属性改变属性值

```js
const div = document.getElementById('id');
div.setAttribute('class', 'white'); //第一个参数属性名，第二个参数属性值。
```

## 删除节点

删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的 removeChild 把自己删掉

```js
// 拿到待删除节点:
const self = document.getElementById('to-be-removed');
// 拿到父节点:
const parent = self.parentElement;
// 删除:
const removed = parent.removeChild(self);
removed === self; // true
```

删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置
