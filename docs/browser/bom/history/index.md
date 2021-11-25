---
title: history
order: 5
---

## 历史状态

history.pushState()方法接收 3 个参数:一个 state 对象、一个新状态的标题和一个(可选的)相对 URL。pushState()方法执行后

- 状态信息就会被推到历史记录中
- 浏览器地址栏也会改变以反映新的相对 URL。除了这些变化之外，即使
- location.href 返回的是地址栏中的内容，**浏览器页不会向服务器发送请求**

因为 pushState()会创建新的历史记录，所以也会相应地启用“后退”按钮。此时单击“后退” 按钮，就会触发 window 对象上的 popstate 事件。

传给 pushState()和 replaceState()的 state 对象应该只包含可以被序列化的信息。

## hash 状态

HTML5 增加了 hashchange 事件，用于在 URL 散列值(URL 最后#后面的部分)发生变化时通知开发者。event 对象有两个新属性

- oldURL：变化前的 URL
- newURL：变化后的 URL

这两个属性分别保存变化前后的 URL，而且是包含散列值的**完整 URL**。如果想确定当前的散列值，最好使用 `location.hash` 获取

```js
const hashHandler = e => {
  console.log(`Old URL: ${event.oldURL}, \n New URL: ${event.newURL}`);
  console.log(`Current hash: ${location.hash}`);
};

window.addEventListener('hashchange', hashHandler, false);
```