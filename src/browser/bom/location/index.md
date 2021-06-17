---
title: location
order: 2
---

## 前言

<code src="./demo/Location.jsx" inline />

`location` 既是 `window` 对象的属性，也是 `document` 对象的属性;

```js
window.location === document.location; // true
```

换句话说，`window.location` 和 `document.location` 引用的是同一个对象。

| 属性名   | 说明                                                                           |
| -------- | ------------------------------------------------------------------------------ |
| hash     | 返回 URL 中的 hash(#号后跟零或多个字符)，如果 URL 中不包含散列，则返回空字符串 |
| host     | 返回服务器名称和端口号(如果有)                                                 |
| hostname | 返回不带端口号的服务器名称                                                     |
| href     | 返回当前加载页面的完整 URL。而 location 对象的 toString()方法也返回这个值      |
| pathname | 返回 URL 中的目录和(或)文件名                                                  |
| port     | 返回 URL 中指定的端口号。如果 URL 中不包含端口号，则 这个属性返回空字符串      |
| protocol | 返回页面使用的协议。通常是 `http:`或 `https:`                                  |
| search   | 返回 URL 的查询字符串。这个字符串以问号开头                                    |

## 位置操作

使用 `location` 对象可以通过很多方式来改变浏览器的位置。除了 `hash` 之外，只要修改 `location` 的一个属性，就会导致页面重新加载新 `URL`

```js
//假设初始 URL 为 http://www.wrox.com/WileyCDA/
//将 URL 修改为"http://www.wrox.com/WileyCDA/#section1"

location.hash = '#section1';
//将 URL 修改为"http://www.wrox.com/WileyCDA/?q=javascript"
location.search = '?q=javascript';
//将 URL 修改为"http://www.yahoo.com/WileyCDA/"
location.hostname = 'www.yahoo.com';
//将 URL 修改为"http://www.yahoo.com/mydir/"
location.pathname = 'mydir';
//将 URL 修改为"http://www.yahoo.com:8080/WileyCDA/"
location.port = 8080;
```

`location.reload()`，此方法可以重新刷新当前页面。这个方法会根据最有效的方式刷新页面，如果页面自上一次请求以来没有改变过，页面就会从浏览器缓存中重新加载。如果要强制从服务器中重新加载，传递一个参数 true 即可

## 获取 url 参数

```js
function getUrlParameters(url) {
  const parts = url.match(/([^?=&]+)(=([^&]*))/g) || [];

  return parts.reduce((paramters, part) => {
    const [key, value] = part.split('=');
    paramters[key] = value;

    return paramters;
  }, {});
}
```

## url 参数系列化

```js
/**
 *
 * @param {Object} params
 */
function serialize(params) {
  const parts = [];

  for (let key in params) {
    let value = params[key];

    if (value == null) return;

    if (Array.isArray(value)) {
      key = `${key}[]`;
    } else {
      value = [value];
    }

    value.forEach(val => {
      if (Object.prototype.toString.call(val) === '[object Date]') {
        val = new Date(val);
      } else if (Object.prototype.toString.call(val) === '[object Object]') {
        val = JSON.stringify(val);
      }

      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
    });
  }

  return parts.join('&');
}

export default serialize;
```
