---
title: 节点
order: 1
---

<code src="../../../demos/dom/Node.jsx" />

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

## 节点关系

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

## 操纵节点

### 新增节点

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
