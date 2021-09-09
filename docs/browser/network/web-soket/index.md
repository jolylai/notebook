---
title: Web Socket
---

<code src="./demos/Socket.jsx" />

## 建立 WebSocket

实例化了 `WebSocket` 对象后，浏览器就会马上尝试创建连接。

```js
// const websocket =  new WebSocket(url [, protocols]);
const socket = new WebSocket('ws://localhost:3001', 'my-websocket');
```

必须给 WebSocket 构造函数传入绝对 URL。

同源策略对 Web Sockets 不适用，因此可以通 过它打开到任何站点的连接。至于是否会与某个域中的页面通信，则完全取决于服务器。(通过握手信息就可以知道请求来自何方。)

协议升级请求总是由客户端发起的,这个请求需要添加两项额外的 header

```
GET ws://localhost:3001/ HTTP/1.1
Host: localhost:3001
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
Origin: http://localhost:3000
Sec-WebSocket-Version: 13
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,fr;q=0.8
Sec-WebSocket-Key: 4XDLm89lu6Cqq/6kSTjhwg==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```

- `Connection: Upgrade` —— 表示客户端想要更改协议。
- `Upgrade: websocket` —— 请求的协议是 “websocket”。
- `Origin` —— 客户端页面的源。WebSocket 对象是原生支持跨源的。没有特殊的 header 或其他限制。旧的服务器无法处理 WebSocket，因此不存在兼容性问题。但是 Origin header 很重要，因为它允许服务器决定是否使用 WebSocket 与该网站通信。
- `Sec-WebSocket-Key` —— 浏览器随机生成的安全密钥。
- `Sec-WebSocket-Version` —— WebSocket 协议版本，当前为 13。

如果服务器决定升级这次连接，就会返回一个 101 Switching Protocols 响应状态码，和一个要切换到的协议的头部字段 Upgrade。 如果服务器没有（或者不能）升级这次连接，它会忽略客户端发送的 "Upgrade 头部字段，返回一个常规的响应：例如一个 200 OK).

```
Status Code: 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: heANzFKEt2W2iWRfUX6N0wpV31o=
```

这里 `Sec-WebSocket-Accept` 是 `Sec-WebSocket-Key`，是使用特殊的算法重新编码的。浏览器使用它来确保响应与请求相对应。

## 发送和接收数据

WebSocket 有一个表示当前状态的 readyState 属性

```js
const socket = new WebSocket('ws://localhost:3001', 'vite-hmr');

socket.addEventListener('open', event => {
  console.log('event: open', event);
});

socket.addEventListener('message', event => {
  console.log('event: message', event);
});

socket.addEventListener('error', event => {
  console.log('event: error', event);
});

socket.addEventListener('close', event => {
  console.log('event: close', event);
});

if (socket.readyState === WebSocket.OPEN) {
  socket.sent();
}
```

- WebSocket.OPENING (0):正在建立连接。
- WebSocket.OPEN (1):已经建立连接。
- WebSocket.CLOSING (2):正在关闭连接。
- WebSocket.CLOSE (3):已经关闭连接。

要向服务器发送数据，使用 send()方法并 传入一个字符串、ArrayBuffer 或 Blob

```js
let socket = new WebSocket('ws://www.example.com/server.php');

let stringData = 'Hello world!';
let arrayBufferData = Uint8Array.from(['f', 'o', 'o']);
let blobData = new Blob(['f', 'o', 'o']);

socket.send(stringData);
socket.send(arrayBufferData.buffer);
socket.send(blobData);
```

### 重复发送

场景：我们的应用程序正在生成大量要发送的数据。但是用户的网速却很慢，可能是在乡下的移动设备上。

我们可以反复地调用 socket.send(data)。但是数据将会缓冲（储存）在内存中，并且只能在网速允许的情况下尽快将数据发送出去。

socket.bufferedAmount 属性储存目前已缓冲的字节数，等待通过网络发送。

我们可以检查它以查看 socket 是否真的可用于传输。

```js
// 每 100ms 检查一次 socket
// 仅当所有现有的数据都已被发送出去时，再发送更多数据
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send('其他信息');
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

| 数字码 | 描述                                                           |
| ------ | -------------------------------------------------------------- |
| `1000` | 默认，正常关闭（如果没有指明 code 时使用它），                 |
| `1006` | 没有办法手动设定这个数字码，表示连接丢失（没有 close frame）。 |
| `1001` | 一方正在离开，例如服务器正在关闭，或者浏览器离开了该页面，     |
| `1009` | 消息太大，无法处理，                                           |
| `1011` | 服务器上发生意外错误，                                         |

WebSocket 码有点像 HTTP 码，但它们是不同的。特别是，小于 1000 的码都是被保留的，如果我们尝试设置这样的码，将会出现错误。

```js
// 在连接断开的情况下
socket.onclose = event => {
  // event.code === 1006
  // event.reason === ""
  // event.wasClean === false（未关闭 frame）
};
```

[web soket](https://www.bilibili.com/video/BV1jy4y1U7UE?p=2&t=691)
