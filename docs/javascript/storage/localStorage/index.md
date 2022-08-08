---
title: localStorage
group:
  title: 本地存储
---

## 前言

关于 cookie、sessionStorage、localStorage 三者的区别主要如下：

存储大小： cookie 数据大小不能超过 4k，sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大

有效时间：localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据； sessionStorage 数据在当前浏览器窗口关闭后自动删除；cookie 设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭

数据与服务器之间的交互方式， cookie 的数据会自动的传递到服务器，服务器端也可以写 cookie 到客户端； sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存

## 特点

- 生命周期：持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的
- 存储的信息在同一域中是共享的
- 当本页操作（新增、修改、删除）了 localStorage 的时候，本页面不会触发 storage 事件,但是别的页面会触发 storage 事件。
- 大小：5M（跟浏览器厂商有关系）
- localStorage 本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡
- 受同源策略的限制

localStorage 也不是完美的，它有两个缺点：

无法像 Cookie 一样设置过期时间
只能存入字符串，无法直接存对象

```js
localStorage.setItem('key', { name: 'value' });
console.log(localStorage.getItem('key')); // '[object, Object]'
```

## 使用

```js
// 设置
localStorage.setItem('username', 'cfangxu');

// 获取
localStorage.getItem('username');

// 获取键名
localStorage.key(0); //获取第一个键名

// 删除
localStorage.removeItem('username');

// 一次性清除所有存储
localStorage.clear();
```
