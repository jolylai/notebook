---
title: XMLHttpRequest
order: 2
---

## 前言

<code src='../../../demos/xhr' inline />

在现代 Web 开发中，出于以下三种原因，我们还在使用 XMLHttpRequest：

- 历史原因：我们需要支持现有的使用了 XMLHttpRequest 的脚本。
- 我们需要兼容旧浏览器，并且不想用 polyfill（例如为了使脚本更小）。
- 我们需要做一些 fetch 目前无法做到的事情，例如跟踪上传进度。

## GET 请求

最常用的请求方法是 GET 请求，用于向服务器查询某些信息。下面使用 `XMLHttpRequest` 发送一个 GET 请求

```js
const xhr = new XMLHttpRequest();

xhr.open('get', 'http://www.mocky.io/v2/5e01ea3f2f00007d97dcd401', true);

xhr.send(null);
```

调用 `open()`方法，`open()`方法并不会真正发送请求， 而只是启动一个请求以备发送。这个方法接收 3 个参数:

- 请求类型("get"、"post"等)
- 请求 URL
- 表示请求是否异步的布尔值。

`send()`方法接收一个参数，是作为请求体发送的数据。如果不需要发送请求体，则必须传 `null`， 因为这个参数在某些浏览器中是必需的。调用 `send()`之后，请求就会发送到服务器。

必要时，需要在 GET 请求的 URL 后面添加查询字符串参数。对 XHR 而言，查询字符串必须正确编码后添加到 URL 后面，然后再传给 `open()`方法。
发送 GET 请求最常见的一个错误是查询字符串格式不对。查询字符串中的每个名和值都必须使用 `encodeURIComponent()`编码，所有名/值对必须以和号(&)分隔

<!-- todo axios buildURL -->

可以使用以下函数将查询字符串参数添加到现有的 URL 末尾:

```js
function addURLParam(url, name, value) {
  url += url.indexOf('?') == -1 ? '?' : '&';
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
  return url;
}
```

这里定义了一个 `addURLParam()`函数，它接收 3 个参数:要添加查询字符串的 URL、查询参数和 参数值。首先，这个函数会检查 URL 中是否已经包含问号(以确定是否已经存在其他参数)。如果没有， 则加上一个问号;否则就加上一个和号。然后，分别对参数名和参数值进行编码，并添加到 URL 末尾。最后一步是返回更新后的 URL。

```js
const xhr = new XMLHttpRequest();

function addURLParam(url, name, value) {
  url += url.indexOf('?') == -1 ? '?' : '&';
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
  return url;
}

const url = addURLParam(
  'http://www.mocky.io/v2/5e01ea3f2f00007d97dcd401',
  'name',
  'jack',
);

xhr.open('get', url, true);

xhr.send(null);
```

## POST 请求

第二个最常用的请求是 POST 请求，用于向服务器发送应该保存的数据。每个 POST 请求都应该在 请求体中携带提交的数据。POST 请求的请求体可以包含非常多的数据，而且数据可以是任意格式。

#### XHR 模拟表单提交

默认情况下，对服务器而言，POST 请求与提交表单是不一样的。服务器逻辑需要读取原始 POST 数据才能取得浏览器发送的数据。

```js
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.responseText);
    }
  }
};

xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

xhr.open('post', 'http://www.mocky.io/v2/5e01ea3f2f00007d97dcd401', true);

// 序列化数据
const data = serialize({ pageNumber: 1, pageSize: 10 });

xhr.send(data);
```

1. 将 `Content-Type` 头部信息设置为 `application/x-www-form-urlencoded`，也就是表单 提交时的内容类型
2. 创建对应格式的字符串。

#### FormData

FormData 为序列化表单以及创建与表单格式相同的数据(用于通过 XHR 传输)提供了便利。

```js
const formData = new FormData(document.forms[0]);

const data = new FormData();
data.append('name', 'Nicholas');

// { list: [ 11, 22 ] }
const formDataList = new FormData();
formDataList.append('list[]', 11);
formDataList.append('list[]', 12);
```

post 请求使用 FormData 发送数据

```js
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.responseText);
    }
  }
};

xhr.open('post', 'http://www.mocky.io/v2/5e01ea3f2f00007d97dcd401', true);

const data = new FormData();
data.append('name', 'Nicholas');

xhr.send(data);
```

使用 FormData 的方便之处体现在不必明确地在 XHR 对象上设置请求头部。XHR 对象能够识别传 入的数据类型是 FormData 的实例，并配置适当的头部信息。

## 获取响应内容

收到响应后，XHR 对象的以下属性会被填充上数据。

- `responseText`:作为响应主体被返回的文本。
- `responseXML`:如果响应的内容类型是`"text/xml"` 或 `"application/xml"`，这个属性中存包含着响应数据的 XML DOM 文档。
- `status`:响应的 HTTP 状态。
- `statusText`:HTTP 状态的说明。

无论内容类型是什么，响应主体的内容都会保存到 `responseText` 属性中;而 对于非 `XML` 数据而言，`responseXML` 属性的值将为 `null`。

```js
function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}
```

### readyState

XHR 对象的 `readyState` 属性表示请求 /响应过程的当前活动阶段，对应的值如下

- `0`:未初始化。尚未调用 open()方法。
- `1`:启动。已经调用 open()方法，但尚未调用 send()方法。
- `2`:发送。已经调用 send()方法，但尚未接收到响应。
- `3`:接收。已经接收到部分响应数据。
- `4`:完成。已经接收到全部响应数据，而且已经可以在客户端使用了。

只要 `readyState` 属性的值由一个值变成另一个值，都会触发一次 `readystatechange` 事件，因此可以检测 `XHR` 对象的 `readyState` 属性来判断是否已经接受到响应

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.responseText);
    }
  }
};
```

### load 事件

`load` 事件，用以替代 `readystatechange` 事件。响应接收完毕后将触发 `load` 事件，因此也就没有必要去检查 `readyState` 属性了。而 `onload` 事件处理程序会接收到一个 `event` 对象，其 `target` 属性 就指向 `XHR` 对象实例，因而可以访问到 `XHR` 对象的所有方法和属性。然而，并非所有浏览器都为这个事件实现了适当的事件对象。结果，开发人员还是要像下面这样被迫使用 `XHR` 对象变量

```js
const xhr = new XMLHttpRequest();

xhr.load = function() {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.responseText);
  }
};

xhr.open('get', 'http://www.mocky.io/v2/5e01ea3f2f00007d97dcd401', true);

xhr.send(null);
```

### 重写响应的 MIME 类型

因为响应返回的 `MIME` 类型决定了 `XHR` 对象如何处理响应， 所以如果有办法覆盖服务器返回的类型，那么是有帮助的。

服务器返回的 `MIME` 类型是 `text/plain`，但数据中实际包含的是 `XML`。根据 `MIME` 类型， 即使数据是`XML`，`responseXML` 属性中仍然是 `null`。通过调用 `overrideMimeType()`方法，可以保 证把响应当作 `XML` 而非纯文本来处理。

```js
const xhr = new XMLHttpRequest();
xhr.open('get', 'http://www.mocky.io/v2/5e01ea3f2f00007d97dcd401', true);
xhr.overrideMimeType('text/xml');
xhr.send(null);
```

调用 `overrideMimeType()`必须在 `send()`方法之前，才能保证重写响应的 `MIME` 类型。

## 超时设定

如果发出去的请求服务器迟迟没有返回相应，我们需要中断请求，并抛出一个超时错误

```js
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    try {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        alert(xhr.responseText);
      } else {
        alert('Request was unsuccessful: ' + xhr.status);
      }
    } catch (ex) {
      //假设由 ontimeout 事件处理程序处理
    }
  }
};
xhr.open('get', 'timeout.php', true);

xhr.timeout = 1000;
xhr.ontimeout = function() {
  alert('Request did not return in a second.');
};

xhr.send(null);
```

将 `timeout` 属性设置为 1000 毫秒，意味着如果请求在 1 秒钟内还没有返回，就会自动终止。请求终止时，会调用 `ontimeout` 事件处理程序。但此时 `readyState` 可能已经改变为 4 了，这意味着会调用 `onreadystatechange` 事件处理程序。可是，如果在超时终止 请求之后再访问 `status` 属性，就会导致错误。为避免浏览器报告错误，可以将检查 `status` 属性的语句封装在一个 `try-catch` 语句当中。

## 取消请求

```js
xhr.abort();
```

## 状态码

|     | 类别                             | 原因短语                   |
| --- | -------------------------------- | -------------------------- |
| 1XX | Informational（信息性状态码）    | 接收的请求正在处理         |
| 2XX | Success（成功状态码）            | 请求正常处理完毕           |
| 3XX | Redirection（重定向状态码）      | 需要进行附加操作以完成请求 |
| 4XX | Client Error（客户端错误状态码） | 服务器无法处理请求         |
| 5XX | Server Error（服务器错误状态码） | 服务器处理请求出错         |

**200** OK

表示从客户端发来的请求在服务器端被正常处理了。
在响应报文内，随状态码一起返回的信息会因方法的不同而发生改变。比如，使用 GET 方法时，对应请求资源的实体会作为响应返回；而使用 HEAD 方法时，对应请求资源的实体首部不随报文主体作为响应返回（即在响应中只返回首部，不会返回实体的主体部分）。

**204** No Content

该状态码代表服务器接收的请求已成功处理，但在返回的响应报文中不含实体的主体部分。另外，也不允许返回任何实体的主体。比如，“方法时，对应请求资源的实体会作为响应返回；而使用 HEAD 方法时，对应请求资源的实体首部不随报文主体作为响应返回（即在响应中只返回首部，不会返回实体的主体部分）。

**204** No Content

该状态码代表服务器接收的请求已成功处理，但在返回的响应报文中不含实体的主体部分。另外，也不允许返回任何实体的主体。比如，当从浏览器发出请求处理后，返回 204 响应，那么浏览器显示的页面不发生更新。
一般在只需要从客户端往服务器发送信息，而对客户端不需要发送新信息内容的情况下使用。

**206** Partial Content

该状态码表示客户端进行了范围请求，而服务器成功执行了这部分的 GET 请求。响应报文中包含由 Content-Range 指定范围的实体内容。

**301** Moved Permanently

永久性重定向。该状态码表示请求的资源已被分配了新的 URI，以后应使用资源现在所指的 URI。也就是说，如果已经把资源对应的 URI 保存为书签了，这时应该按 Location 首部字段提示的 URI 重新保存。”

**302** Found

临时性重定向。该状态码表示请求的资源已被分配了新的 URI，希望用户（本次）能使用新的 URI 访问。
和 301 Moved Permanently 状态码相似，但 302 状态码代表的资源不是被永久移动，只是临时性质的。换句话说，已移动的资源对应的 URI 将来还有可能发生改变。比如，用户把 URI 保存成书签，但不会像 301 状态码出现时那样去更新书签，而是仍旧保留返回 302 状态码的页面对应的 URI。

**303** See Other

该状态码表示由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源。
303 状态码和 302 Found 状态码有着相同的功能，但 303 状态码明确表示客户端应当采用 GET 方法获取资源，这点与 302 状态码有区别。
比如，当使用 POST 方法访问 CGI 程序，其执行后的处理结果是希望客户端能以 GET 方法重定向到另一个 URI 上去时，返回 303 状态码。虽然 302 Found 状态码也可以实现相同的功能，但这里使用 303 状态码是最理想的。

**304** Not Modified

该状态码表示客户端发送附带条件的请求 2 时，服务器端允许请求访问资源，但未满足条件的情况。304 状态码返回时，不包含任何响应的主体部分。304 虽然被划分在 3XX 类别中，但是和重定向没有关系。

**307** Temporary Redirect

临时重定向。该状态码与 302 Found 有着相同的含义。尽管 302 标准禁止 POST 变换成 GET，但实际使用时大家并不遵守。
307 会遵照浏览器标准，不会从 POST 变成 GET。但是，对于处理响应时的行为，每种浏览器有可能出现不同的情况。

**400** Bad Request

该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。另外，浏览器会像 200 OK 一样对待该状态码。

**401** Unauthorized

该状态码表示发送的请求需要有通过 HTTP 认证（BASIC 认证、DIGEST 认证）的认证信息。另外若之前已进行过 1 次请求，则表示用 户认证失败。
返回含有 401 的响应必须包含一个适用于被请求资源的 WWW-Authenticate 首部用以质询（challenge）用户信息。当浏览器初次接收到 401 响应，会弹出认证用的对话窗口。

**403** Forbidden

该状态码表明对请求资源的访问被服务器拒绝了。服务器端没有必要给出拒绝的详细理由，但如果想作说明的话，可以在实体的主体部分对原因进行描述，这样就能让用户看到了。未获得文件系统的访问授权，访问权限出现某些问题（从未授权的发送源 IP 地址试图访问）等列举的情况都可能是发生 403 的原因。

**404** Not Found

该状态码表明服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。

**500** Internal Server Error

该状态码表明服务器端在执行请求时发生了错误。也有可能是 Web 应用存在的 bug 或某些临时的故障。

**503** Service Unavailable

该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。如果事先得知解除以上状况需要的时间，最好写入 RetryAfter 首部字段再返回给客户端。状态码和状况的不一致不少返回的状态码响应都是错误的，但是用户可能察觉不到这点。比如 Web 应用程序内部发生错误，状态码依然返回 200 OK，这种情况也经常遇到。

## HTTP 头部

每个 HTTP 请求和响应都会携带一些头部字段，这些字段可能对开发者有用。XHR 对象会通过一 些方法暴露与请求和响应相关的头部字段。
默认情况下，XHR 请求会发送以下头部字段。

- `Accept`:浏览器可以处理的内容类型。
- `Accept-Charset`:浏览器可以显示的字符集。
- `Accept-Encoding`:浏览器可以处理的压缩编码类型。
- `Accept-Language`:浏览器使用的语言。
- `Connection`:浏览器与服务器的连接类型。
- `Cookie`:页面中设置的 Cookie。
- `Host`:发送请求的页面所在的域。
- `Referer`:发送请求的页面的 URI。注意，这个字段在 HTTP 规范中就拼错了，所以考虑到兼容
  性也必须将错就错。(正确的拼写应该是 Referrer。)
- `User-Agent`:浏览器的用户代理字符串。

## 携带凭证

响应头必须设置 `Access-Control-Allow-Credentials: true`

如果 XMLHttpRequest 请求设置了 withCredentials 属性，那么服务器不得设置 Access-Control-Allow-Origin 的值为\*

```js
const xhr = new XMLHttpRequest();
document.cookie = 'name=xiamen'; // cookie不能跨域
xhr.withCredentials = true; // 前端设置是否带cookie
xhr.open('get', 'http://www.mocky.io/v2/5e01ea3f2f00007d97dcd401', true);
xhr.load = function() {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.response);
  }
};
xhr.send(null);
```

## 进度事件

每个请求都从触发 `loadstart` 事件开始，接下来是一或多个 `progress` 事件，然后触发 `error`、`abort` 或 `load` 事件中的一个，最后以触发 `loadend` 事件结束。

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/xhr.svg)

- `loadstart`:在接收到响应数据的第一个字节时触发。
- `progress`:在接收响应期间持续不断地触发。
- `error`:在请求发生错误时触发。
- `abort`:在因为调用 abort()方法而终止连接时触发。
- `load`:在接收到完整的响应数据时触发。
- `loadend`:在通信完成或者触发 error、abort 或 load 事件后触发。

在浏览器接收数据期间，这个事件会反复触 发。每次触发时，`onprogress` 事件处理程序都会收到 `event` 对象，其 `target` 属性是 `XHR` 对象，且 包含 3 个额外属性

- `lengthComputable`: 是一个表示进度信息是否可用的布尔值
- `position`: 表示已经接收的字节数
- `totalSize`: 表示根据 `Content-Length` 响应头部确定的预期字节数。

<code src='../../../demos/xhr/Progress.jsx' inline />

为了保证正确执行，必须在调用 `open()` 之前添加 `onprogress` 事件处理程序。假设响应有 `Content-Length` 头部，就可以 利用这些信息计算出已经收到响应的百分比。

## 优质代码

antd 组件库中 upload 组件的请求代码 [Upload](https://github.com/react-component/upload/blob/master/src/request.ts)

```js
function getError(option, xhr) {
  const msg = `cannot ${option.method} ${option.action} ${xhr.status}'`;
  const err = new Error(msg);
  err.status = xhr.status;
  err.method = option.method;
  err.url = option.action;
  return err;
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

// option {
//  onProgress: (event: { percent: number }): void,
//  onError: (event: Error, body?: Object): void,
//  onSuccess: (body: Object): void,
//  data: Object,
//  filename: String,
//  file: File,
//  withCredentials: Boolean,
//  action: String,
//  headers: Object,
// }
export default function upload(option) {
  const xhr = new XMLHttpRequest();

  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100;
      }
      option.onProgress(e);
    };
  }

  const formData = new FormData();

  if (option.data) {
    Object.keys(option.data).forEach(key => {
      const value = option.data[key];
      // support key-value array data
      if (Array.isArray(value)) {
        value.forEach(item => {
          // { list: [ 11, 22 ] }
          // formData.append('list[]', 11);
          formData.append(`${key}[]`, item);
        });
        return;
      }

      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    // allow success when 2xx status
    // see https://github.com/react-component/upload/issues/34
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), getBody(xhr));
    }

    option.onSuccess(getBody(xhr), xhr);
  };

  xhr.open(option.method, option.action, true);

  // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  // when set headers['X-Requested-With'] = null , can close default XHR header
  // see https://github.com/react-component/upload/issues/33
  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  for (const h in headers) {
    if (headers.hasOwnProperty(h) && headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }
  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    },
  };
}
```
