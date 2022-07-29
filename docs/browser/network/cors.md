---
title: 跨域资源共享
---

## 前言

通过 XHR 进行 AJAX 通信的一个主要限制是跨源安全策略。默认情况下，XHR 只能访问与发起请求的页面在同一个域内的资源。

跨源资源共享(CORS，Cross-Origin Resource Sharing)定义了浏览器与服务器如何实现跨源通信。 CORS 背后的基本思路就是使用自定义的 HTTP 头部允许浏览器和服务器相互了解，以确实请求或响应应该成功还是失败。

跨域 XHR 对象也有一些限制，但为了安全这些限制是必需的。以下就是这些限制。

- 不能使用 setRequestHeader()设置自定义头部。
- 不能发送和接收 cookie。
- 调用 getAllResponseHeaders()方法总会返回空字符串

## 预检请求

CORS 通过一种叫做 Preflighted Requests 的透明服务器验证机制支持开发人员使用自定义的头部、
GET 或 POST 之外的方法，以及不同类型的主体内容。在使用下列高级选项来发送请求时，就会向服务
器发送一个 Preflight 请求。这种请求使用 OPTIONS 方法，发送下列头部。

在这个请求发送后，服务器可以确定是否允许这种类型的请求。

### 简单请求

只要同时满足以下两大条件，就属于简单请求

**条件 1**：使用下列方法之一：

- GET
- HEAD
- POST

**条件 2**：Content-Type 的值仅限于下列三者之一：

- text/plain
- multipart/form-data
- application/x-www-form-urlencoded

比如一个简单的使用 `GET` 或 `POST` 发送的请求，它没有自定义的头部，而主体内容是 `text/plain`。在 发送该请求时，需要给它附加一个额外的 `Origin` 头部，其中包含请求页面的源信息(协议、域名和端 口)，以便服务器根据这个头部信息来决定是否给予响应。下面是 `Origin` 头部的一个示例

```
Origin: http://www.nczonline.net
```

如果服务器认为这个请求可以接受，就在 `Access-Control-Allow-Origin` 头部中回发相同的源信息(如果是公共资源，可以回发`*`)。例如:

```
Access-Control-Allow-Origin: http://www.nczonline.net
//  或
Access-Control-Allow-Origin: *
```

如果没有这个头部，或者有这个头部但源信息不匹配，浏览器就会驳回请求。正常情况下，浏览器 会处理请求。**注意，请求和响应都不包含 cookie 信息。**

### 复杂请求

不符合以简单请求条件的请求就肯定是复杂请求了。

复杂请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为 **"预检"请求** ,该请求是 option 方法的，通过该请求来知道服务端是否允许跨域请求。

**请求头信息**

- Origin：与简单的请求相同。
- Access-Control-Request-Method：请求自身使用的方法。
- Access-Control-Request-Headers：（可选）自定义的头部信息，多个头部以逗号分隔。

![request-headers](https://i.loli.net/2019/12/25/ojuFz3BED2TSG6M.png)

**响应头信息**

- Access-Control-Allow-Origin：与简单的请求相同。
- Access-Control-Allow-Methods：允许的方法，多个方法以逗号分隔。
- Access-Control-Allow-Headers：允许的头部，多个头部以逗号分隔。
- Access-Control-Max-Age：应该将这个 Preflight 请求缓存多长时间（以秒表示）

Koa2 可以参考 [koa2-cors](https://github.com/zadzbw/koa2-cors/blob/master/src/index.js)

![response-headers](https://i.loli.net/2019/12/25/QJdwTpY2vAZEsxU.png)

## 带凭据的请求

默认情况下，跨源请求不提供凭据（cookie、HTTP 认证及客户端 SSL 证明 等 ）。 通 过 将 withCredentials 属性设置为 true，可以指定某个请求应该发送凭据。如果服务器接受带凭据的请求，会用下面的 HTTP 头部来响应。

```
Access-Control-Allow-Credentials: true
```

如果发送的是带凭据的请求，但服务器的响应中没有包含这个头部，那么浏览器就不会把响应交给
JavaScript（于是，responseText 中将是空字符串，status 的值为 0，而且会调用 onerror()事件处
理程序）。另外，服务器还可以在 Preflight 响应中发送这个 HTTP 头部，表示允许源发送带凭据的请求。

服务器可以设置浏览器的 cookie 但是请求上带不带上 cookie 是浏览器决定的。
