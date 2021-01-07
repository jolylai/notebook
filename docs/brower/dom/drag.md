---
title: 拖放
group:
  title: DOM
---

```jsx | inline
import React from 'react';

export default () => {
  const onChange = e => {
    console.log('files: ', e.target.files);
    console.log('value: ', e.target.value);
  };

  return (
    <section className="shadow px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
      <form className="relative">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
        <input
          className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
          type="text"
          aria-label="Filter projects"
          placeholder="Filter projects"
        />
      </form>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <li>
          <a className="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200">
            <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
              <div>
                <dt className="sr-only">Title</dt>
                <dd className="group-hover:text-white leading-6 font-medium text-black"></dd>
              </div>
              <div>
                <dt className="sr-only">Category</dt>
                <dd className="group-hover:text-light-blue-200 text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4"></dd>
              </div>
              <div className="col-start-2 row-start-1 row-end-3">
                <dt className="sr-only">Users</dt>
                <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-2">
                  <img
                    x-for="user in item.users"
                    width="48"
                    height="48"
                    className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                  />
                </dd>
              </div>
            </dl>
          </a>
        </li>
      </ul>
    </section>
  );
};
```

## 被拖拽元素

默认情况下，图像、链接和文本是可以拖动的，也就是说，不用额外编写代码，用户就可以拖动它 们。文本只有在被选中的情况下才能拖动，而图像和链接在任何时候都可以拖动。

```jsx | inline
import React from 'react';

export default () => {
  const onChange = e => {
    console.log('files: ', e.target.files);
    console.log('value: ', e.target.value);
  };

  return (
    <article className="p-4 flex space-x-4">
      <img
        src="https://tailwindcss.com/_next/static/media/jucy-beef-burger.032c3c262707ccb9636fb3c909efeaf6.jpg"
        alt=""
        className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
        width="144"
        height="144"
      />
      <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
        <h2 className="text-lg font-semibold text-black mb-0.5">
          <a href="#">Hank’s Juiciest Beef Burger</a>
        </h2>
        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
          <div className="flex-none w-full mt-0.5 font-normal">
            <dt className="inline">By</dt>{' '}
            <dd className="inline text-black">Franecki</dd>
          </div>
        </dl>
      </div>
    </article>
  );
};
```

图像和链接的 `draggable` 属性自动被设置成了 `true`，而其他元素这个属性 的默认值都是 `false`。要想让其他元素可拖动，或者让图像或链接不能拖动，都可以设置这个属性。

```html
<!-- 让这个图像不可以拖动 -->
<img src="smile.gif" draggable="false" alt="Smiley face" />
<!-- 让这个元素可以拖动 -->
<div draggable="true">...</div>
```

拖动某元素时，将依次触发 下列事件: `dragstart -> drag -> dragend`

```js
const dragElement = document.getElementById('dragElement');

dragElement.ondragstart = function() {
  console.log('ondragstart');
};

dragElement.ondrag = function() {
  console.log('ondrag');
};

dragElement.ondragend = function() {
  console.log('dragend');
};
```

- dragstart: 按下鼠标键并开始移动鼠标时，会在被拖放的元素上触发 dragstart 事件。
- drag: 触发 dragstart 事件后，随即会触发 drag 事件，而且在元素被拖动期间会持续触发该事件。
- dragend: 当拖动停止时(无 论是把元素放到了有效的放置目标，还是放到了无效的放置目标上)，会触发 dragend 事件。

## 目标元素

当某个元素被拖动到一个有效的放置目标上时，下列事件会依次发生: `dragenter -> dragover -> dragleave 或 drop`

- `dragenter`: 只要有元素被拖动到放置目标上，就会触发 `dragenter` 事件(类似于 mouseover 事件)。
- `dragover`: 在被拖动的元素还在放置目标的范围内移动时，就会持续触发该事件。
- `dragleave` 或 `drop` :如 `果元素被拖出了放置目标，dragover` 事件不再发生，但会触发 `dragleave` 事件(类似于 mouseout 事件)。如果元素被放到了放置目标中，则会触发 `drop` 事件而不是 `dragleave` 事件。

虽然所有元素都支持放置目标事件，但这些**元素默认是不允许放置的**。**如果拖动元素经过不允许放置的元素，无论用户如何操作，都不会发生 `drop` 事件。**不过，你可以把任何元素变成有效的放置 目标，方法是重写 dragenter 和 dragover 事件的默认行为。

```js
const dropElement = document.querySelector('.dropElement');

dropElement.ondragenter = function(event) {
  event.preventDefault();
};

dropElement.ondragover = function(event) {
  event.preventDefault();
};

dropElement.ondropleave = function() {
  console.log('dropleave');
};

dropElement.ondrop = function() {
  console.log('drop');
};
```

`event.preventDefault()`重写 `dragenter` 和 `dragover` 事件的默认行为,不然无论用户如何操作，都不会发生 `drop` 事件。

## dataTransfer

### 自定义

`dataTransfer` 对象，它是事件对象的一个属性，用于从被拖动元素向放置目标传递字符串格式的数据。

```js
// 被拖拽元素
const dragElements = document.querySelectorAll('.list-group-item');

dragElements.forEach(item => {
  item.setAttribute('draggable', true);

  // 可以在 dragstart 事件处理程序中调用 setData()，手工保存自己要传输的数据，以便将来使用。
  item.ondragstart = function(event) {
    //设置和接收文本数据
    event.dataTransfer.setData('text', 'some text');
    //设置和接收 URL
    event.dataTransfer.setData('URL', 'http://www.wrox.com/');
  };
});

// 目标元素
const dropElement = document.querySelector('.dropElement');

dropElement.ondragenter = function(event) {
  event.preventDefault();
};

/**
 * 保存在 dataTransfer 对象中的数据只能在 drop 事件处理程序中读取。
 * 如果在 ondrop 处理程序中没有读到数据，那就是 dataTransfer 对象已经被销毁，数据也丢失了。
 */
dropElement.ondrop = function(event) {
  const text = event.dataTransfer.getData('text');
  const url = event.dataTransfer.getData('URL');
};
```

HTML5 则对此加以扩展，允许指定各种 MIME 类型。考虑到向后兼容，HTML5 也支持"text"和"URL"，但这两种类型会被映射为"text/plain"和 "text/uri-list"。

```js
dropElement.ondrop = function(event) {
  const text = event.dataTransfer.getData('text/plain');
  const url = event.dataTransfer.getData('text/uri-list');
};
```

在拖动文本框中的文本时，浏览器会调用 setData()方法，将拖动的文本以"text"格式保存在 dataTransfer 对象中。类似地，在拖放链接或图像时，会调用 setData()方法并保存 URL。然后， 在这些元素被拖放到放置目标时，就可以通过 getData()读到这些数据。

dataTransfer 对象可以为每种 MIME 类型都保存一个值。换句话说，同时在这个对象 中保存一段文本和一个 URL 不会有任何问题。

### files

```js
const dropElement = document.querySelector('.dropElement');

dropElement.ondragover = function(event) {
  event.preventDefault();
};

dropElement.ondrop = function(event) {
  event.preventDefault();

  // 遍历文件信息
  const files = event.dataTransfer.files || [];
  console.log('files: ', files);
};
```

[File](https://developer.mozilla.org/zh-CN/docs/Web/API/File)接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。