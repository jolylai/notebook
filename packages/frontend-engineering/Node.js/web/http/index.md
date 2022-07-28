---
title: http
---

HTTP 的全称是超文本传输协议，英文写作 HyperText Transfer Protocol。

## 三次握手

```shell
curl -v http://localhost:3000
# CP的3次握手过程
* Rebuilt URL to: http://localhost:3000/
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 3000 (#0)

# 客户端向服务器端发送请求报文
> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.54.0
> Accept: */*
>
# 服务器端完成处理后，向客户端发送响应内容，包括响应头和响应体
< HTTP/1.1 200 OK
< Content-Type: text/plain
< Date: Fri, 14 May 2021 09:10:05 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Content-Length: 8
<
Node.js
# 最后部分是结束会话的信息
* Connection #0 to host localhost left intact
```

## 发送请求

```js
const http = require('http');

const options = {
  hostnmae: 'localhost',
  port: 3001,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const request = http.request(options, async res => {
  console.log(`状态码 ${res.statusCode}`);

  const responseData = await getResponseData(res);
  console.log('responseData: ', responseData);
});

request.on('error', err => {
  console.log('err: ', err);
});

const data = JSON.stringify({
  type: 'Node.js',
});

request.write(data);
request.end();
```

```js
const getResponseData = stream => {
  return new Promise((resolve, reject) => {
    const responseBuffer = [];

    stream.on('data', chunk => {
      responseBuffer.push(chunk);
    });

    stream.on('end', () => {
      const responseData = Buffer.concat(responseBuffer);

      resolve(responseData.toString());
    });

    stream.on('error', err => {
      reject(err);
    });
  });
};
```

## HTTP 服务器

搭建 个简单的 HTTP web 服务器

```js
const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('你好世界\n');
});

server.listen(port, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});
```

获取请求的数据

```js
const http = require('http');

const getRequestData = req => {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      console.log('chunk: ', chunk);
      data += chunk;
    });

    req.on('end', () => {
      try {
        const json = JSON.parse(data);
        resolve(json);
      } catch (err) {
        reject(err);
      }
    });
  });
};

const server = http.createServer(async (req, res) => {
  const data = await getRequestData(req);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Node.js');
});

server.listen(3001, () => {
  console.log(`server listen at http://localhost:3001`);
});
```
