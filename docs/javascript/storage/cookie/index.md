---
title: Cookie
---

## 前言

<code src='./demos/Cookie.jsx' />

Cookie 是服务器保存在浏览器的一小段文本信息，每个 Cookie 的大小一般不能超过 4KB。浏览器每次向服务器发出请求，就会自动附上这段信息。

Cookie 主要用来分辨两个请求是否来自同一个浏览器，以及用来保存一些状态信息。它的常用场合有以下一些。

- 对话（session）管理：保存登录、购物车等需要记录的信息。
- 个性化：保存用户的偏好，比如网页的字体大小、背景色等等。
- 追踪：记录和分析用户行为。

## Cookie 属性

#### domain

`cookie` 有效的域。发送到这个域的所有请求都会包含对应的 `cookie`。这个值可能包含子域(如 `www.wrox.com`)，也可以不包含(如`.wrox.com` 表示对 `wrox.com` 的所有子域都有效)。如果不明确设置，则默认为设置 `cookie` 的域。

**path**

请求 URL 中包含这个路径才会把 `cookie` 发送到服务器。例如，可以指定 `cookie` 只能由`http://www.wrox.com/books/`访问，因此访问`http://www.wrox.com/`下的页面就不会发送 `cookie`，即使请求的是同一个域。

#### Expires，Max-Age

表示何时删除 `cookie` 的时间戳(即什么时间之后就不发送到服务器了)。默认情况下，浏览器会话结束后会删除所有 `cookie`。不过，也可以设置删除 `cookie` 的时间。这个值是 GMT 格 式(Wdy, DD-Mon-YYYY HH:MM:SS GMT)，用于指定删除 `cookie` 的具体时间。这样即使关闭 浏览器 `cookie` 也会保留在用户机器上。把过期时间设置为过去的时间会立即删除 `cookie`。

如果不设置该属性，或者设为 null，Cookie 只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，该 Cookie 就会被删除。

Max-Age 属性指定从现在开始 Cookie 存在的秒数，比如 60 _ 60 _ 24 \* 365（即一年）。过了这个时间以后，浏览器就不再保留这个 Cookie。

如果同时指定了 Expires 和 Max-Age，那么 Max-Age 的值将优先生效。

如果 Set-Cookie 字段没有指定 Expires 或 Max-Age 属性，那么这个 Cookie 就是 Session Cookie，即它只在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 Cookie。

#### secure

设置之后，只在使用 SSL 安全连接的情况下才会把 `cookie` 发送到服务器。例如，请 求 `https://www.wrox.com` 会发送 `cookie`，而请求 `http://www.wrox.com` 则不会。

#### HttpOnly

HttpOnly 属性指定该 Cookie 无法通过 JavaScript 脚本拿到，主要是 Document.cookie 属性、XMLHttpRequest 对象和 Request API 都拿不到该属性。这样就防止了该 Cookie 被脚本读到，只有浏览器发出 HTTP 请求时，才会带上该 Cookie。

## 创建 Cookie

在设置值时，可以通过 `document.cookie` 属性设置新的 `cookie` 字符串。这个字符串在被解析后会 添加到原有 `cookie` 中。设置 `document.cookie` 不会覆盖之前存在的任何 `cookie`，除非设置了已有的 `cookie`。设置 `cookie` 的格式如下

```js
document.cookie = 'name=value';
```

创建一个名为 name 值为 value 的 Cookie

| Cookie | 描述                                                                                |
| ------ | ----------------------------------------------------------------------------------- |
| 名称   | 唯一标识 `cookie` 的名称。`cookie` 名不区分大小写。**cookie 名必须经过 URL 编码**。 |
| 值     | 存储在 `cookie` 里的字符串值。这个值**必须经过 URL 编码**。                         |

因为在 JavaScript 中读写 cookie 不是很直观，所以可以通过辅助函数来简化相应的操作。与 cookie 相关的基本操作有读、写和删除。

```js
function write(name, value, expires, path, domain, secure) {
  var cookie = [];
  cookie.push(name + '=' + encodeURIComponent(value));

  if (utils.isNumber(expires)) {
    cookie.push('expires=' + new Date(expires).toGMTString());
  }
  if (utils.isString(path)) {
    cookie.push('path=' + path);
  }
  if (utils.isString(domain)) {
    cookie.push('domain=' + domain);
  }
  if (secure === true) {
    cookie.push('secure');
  }
  document.cookie = cookie.join('; ');
}
```

参数以它们的使用频率为序，只有前两个是必需的,依次为

- `name`:cookie 名称
- `value`:cookie 值
- `expires`:可选的时间戳(表示何时删除 cookie)
- `path`:可选的 URL 路径
- `domain`:可选的域
- `secure`:可选的布尔值(表示是否添 加 secure 标志)

在方法内部，使用了`encodeURIComponent()`对名称和值进行编码，然后再依次检查其他参数。如果 expires 参数是 Date 对象，则使用 Date 对象的 toGMTString()方法添加一个 expires 选项来获得正确的日期格式。剩下 的代码就是简单地追加 cookie 字符串，最终设置给 `document.cookie`。

## 获取 Cookie

`document.cookie` 返回包含页面中所有有效 `cookie` 的字符串(根据域、路径、过期时间和安全设置)，以分号分隔

- 基于安全方面的考虑，在浏览器中无法获取跨域的 `Cookie` 这一点时永远不变的。
- 不能获取 HTTPOnly 属性的 Cookie。

```js
document.cookie; // name1=value1;name2=value2;name3=value3
```

根据 `Cookie` 名称获取有效 `cookie` 的字符串对应的 `Cookie` 值

```js
function read(name) {
  var match = document.cookie.match(
    new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'),
  );

  return match ? decodeURIComponent(match[3]) : null;
}
```

**所有 Cookie 名和值都是 URL 编码的，因此必须使用 `decodeURIComponent()`解码**.如果没有找到 cookie，则返回 null。

## 删除 Cookie

没有直接删除已有 cookie 的方法。为此，需要再次设置同名 cookie(包括相同路径、域和安全选项)，但要将其过期时间设置为某个过去的时间。

```js
const MS_IN_A_DAY = 24 * 60 * 60 * 1000;

function remove(name) {
  document.cookie = `${name}=;expires=${Date.now() - MS_IN_A_DAY}`;
}
```

#### reference

- [HTTP cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)
- [axios cookies](https://github.com/axios/axios/blob/master/lib/helpers/cookies.js)
- [js-cookie](https://github.com/js-cookie/js-cookie)
