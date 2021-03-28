---
title: Web Sokets
---

[web soket](https://www.bilibili.com/video/BV1jy4y1U7UE?p=2&t=691)

## 建立 WebSocket

实例化了 `WebSocket` 对象后，浏览器就会马上尝试创建连接。

```js
const soket = new WebSocket('ws://localhost:3001');
```

必须给 WebSocket 构造函数传入绝对 URL。同源策略对 Web Sockets 不适用，因此可以通 过它打开到任何站点的连接。至于是否会与某个域中的页面通信，则完全取决于服务器。(通过握手信息就可以知道请求来自何方。)

这是由 `new WebSocket("ws://localhost:3001"`) 发出的请求的浏览器 header 示例。

```
GET ws://localhost:3001/ HTTP/1.1
Host: localhost:3001
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36
Upgrade: websocket
Origin: http://localhost:3000
Sec-WebSocket-Version: 13
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,fr;q=0.8
Sec-WebSocket-Key: 4XDLm89lu6Cqq/6kSTjhwg==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```

- `Origin` —— 客户端页面的源。WebSocket 对象是原生支持跨源的。没有特殊的 header 或其他限制。旧的服务器无法处理 WebSocket，因此不存在兼容性问题。但是 Origin header 很重要，因为它允许服务器决定是否使用 WebSocket 与该网站通信。
- `Connection: Upgrade` —— 表示客户端想要更改协议。
- `Upgrade: websocket` —— 请求的协议是 “websocket”。
- `Sec-WebSocket-Key` —— 浏览器随机生成的安全密钥。
- `Sec-WebSocket-Version` —— WebSocket 协议版本，当前为 13。

如果服务器同意切换为 WebSocket 协议，服务器应该返回响应码 101：

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: heANzFKEt2W2iWRfUX6N0wpV31o=
```

这里 `Sec-WebSocket-Accept` 是 `Sec-WebSocket-Key`，是使用特殊的算法重新编码的。浏览器使用它来确保响应与请求相对应。

WebSocket 有一个表示当前状态的 readyState 属性

```js
const soket = new WebSocket('ws://localhost:3001');
```

- WebSocket.OPENING (0):正在建立连接。
- WebSocket.OPEN (1):已经建立连接。
- WebSocket.CLOSING (2):正在关闭连接。
- WebSocket.CLOSE (3):已经关闭连接。

## 数据传输

WebSocket 通信由 “frames”（即数据片段）组成，可以从任何一方发送，并且有以下几种类型：

- “text frames” —— 包含各方发送给彼此的文本数据。
- “binary data frames” —— 包含各方发送给彼此的二进制数据。
- “ping/pong frames” 被用于检查从服务器发送的连接，浏览器会自动响应它们。
- 还有 “connection close frame” 以及其他服务 frames。

`socket.send(body)` 调用允许 body 是字符串或二进制格式，包括 `Blob`，`ArrayBuffer` 等。不需要额外的设置：直接发送它们就可以了。

当我们收到数据时，文本总是以字符串形式呈现。而对于二进制数据，我们可以在 `Blob` 和 `ArrayBuffer` 格式之间进行选择。

它是由 `socket.binaryType` 属性设置的，默认为 "blob"，因此二进制数据通常以 `Blob` 对象呈现。

## 限速

想象一下：我们的应用程序正在生成大量要发送的数据。但是用户的网速却很慢，可能是在乡下的移动设备上。

我们可以反复地调用 socket.send(data)。但是数据将会缓冲（储存）在内存中，并且只能在网速允许的情况下尽快将数据发送出去。

socket.bufferedAmount 属性储存目前已缓冲的字节数，等待通过网络发送。

我们可以检查它以查看 socket 是否真的可用于传输。

```js
// 每 100ms 检查一次 socket
// 仅当所有现有的数据都已被发送出去时，再发送更多数据
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```

## 连接关闭

通常，当一方想要关闭连接时（浏览器和服务器都具有相同的权限），它们会发送一个带有数字码（numeric code）和文本形式的原因的 “connection close frame”。

它的方法是：

```js
socket.close([code], [reason]);
```

code 是一个特殊的 WebSocket 关闭码（可选）
reason 是一个描述关闭原因的字符串（可选）
然后，另外一方通过 close 事件处理器获取了关闭码和关闭原因，例如：

```js
// 关闭方：
socket.close(1000, 'Work complete');

// 另一方
socket.onclose = event => {
  // event.code === 1000
  // event.reason === "Work complete"
  // event.wasClean === true (clean close)
};
```

最常见的数字码：

1000 —— 默认，正常关闭（如果没有指明 code 时使用它），
1006 —— 没有办法手动设定这个数字码，表示连接丢失（没有 close frame）。
1001 —— 一方正在离开，例如服务器正在关闭，或者浏览器离开了该页面，
1009 —— 消息太大，无法处理，
1011 —— 服务器上发生意外错误，

WebSocket 码有点像 HTTP 码，但它们是不同的。特别是，小于 1000 的码都是被保留的，如果我们尝试设置这样的码，将会出现错误。

```js
// 在连接断开的情况下
socket.onclose = event => {
  // event.code === 1006
  // event.reason === ""
  // event.wasClean === false（未关闭 frame）
};
```
