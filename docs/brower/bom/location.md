---
title: location
order: 2
---

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

```jsx | inline
import React, { useState } from 'react';
import { Input } from 'antd';

export default () => {
  const parseLocation = href => {
    const link = document.createElement('a');
    link.href = href;

    const keys = [
      'href',
      'protocol',
      'host',
      'hostname',
      'port',
      'pathname',
      'search',
      'hash',
      'origin',
    ];

    const result = {};

    keys.forEach(key => {
      result[key] = link[key];
    });

    return result;
  };

  const [location, setLocation] = useState({});

  const handleParse = value => {
    const location = parseLocation(value);
    setLocation(location);
  };

  return (
    <div>
      <Input.Search
        defaultValue="https://developer.mozilla.org:80/en-US/search?q=URL#search-results-close-container"
        placeholder="请输入URL"
        enterButton="解析"
        onSearch={handleParse}
      />

      <table className="mt-2">
        {Object.entries(location).map(([key, value]) => {
          return (
            <tr>
              <td className="border-solid border border-gray-300 p-2 font-semibold text-black">
                {key}
              </td>
              <td className="border-solid border border-gray-300 p-2">
                {value}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
```

## 位置操作

使用 `location` 对象可以通过很多方式来改变浏览器的位置。

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
