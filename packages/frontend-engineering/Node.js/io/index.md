---
title: I/O 处理
---

在计算机科学中指计算机之间或人与计算机之间的信息交换。比如两台计算机通过网卡进行交互，比如向硬盘写入数据或读取硬盘数据，比如人敲击鼠标键盘等，都是 I/O。

## 路径 path

要处理文件就必须先知道文件的路径，path 模块就是一个用来处理文件和文件夹路径的工具

### 模块路径

当前模块的文件路径名

```js
console.log('__dirname', __dirname);
// /Users/laiguolin/Workspace/notebook/nodejs/src/basic/io/path/demo
console.log('__filename', __filename);
//  /Users/laiguolin/Workspace/notebook/nodejs/src/basic/io/path/demo/resolve.js
```

- `__filename`: The file name of the current module. This is the current module file's absolute path with symlinks resolved.
- `__dirname`：The directory name of the current module. This is the same as the `path.dirname()` of the `__filename`.

### 文件名解析

```js
const notes = '/users/joe/notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt
```

- `dirname`: 获取文件的父文件夹。
- `basename`: 获取文件名部分。
- `extname`: 获取文件的扩展名。

可以通过为 basename 指定第二个参数来获取不带扩展名的文件名：

```js
path.basename(notes, path.extname(notes)); //notes
```

### 路径解析

## 文件系统 fs

### 文件属性

如果我们要获取文件大小，创建时间等信息，可以使用 `fs.stat()`，它返回一个 Stat 对象，能告诉我们文件或目录的详细信息

```js
const fs = require('fs');

fs.stat('test.txt', function(err, stat) {
  if (err) {
    console.log('err: ', err);
    return;
  }

  if (stat.isFile()) {
    // 读取的是文件
  }

  if (stat.isDirectory()) {
    // 读取的是目录
  }

  // 文件大小:
  console.log('size: ' + stat.size);
  // 创建时间, Date对象:
  console.log('birth time: ' + stat.birthtime);
  // 修改时间, Date对象:
  console.log('modified time: ' + stat.mtime);
});
```

## 读文件

### 异步读文件

异步读取一个文本文件

```js
const fs = require('fs');
const { resolve } = require('path');

const filePath = resolve(__dirname, '../index.md');

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.log('err: ', err);
    return;
  }
  console.log('data: ', data);
});
```

请注意，sample.txt 文件必须在当前目录下，且文件编码为 utf-8。

异步读取一个图片文件二进制文件

```js
const fs = require('fs');
const { resolve } = require('path');

const imgPath = resolve(__dirname, 'jucy-beef-burger.jpg');

fs.readFile(imgPath, function readFile(err, data) {
  if (err) {
    console.log('err: ', err);
  } else {
    console.log('data: ', data);
  }
});
```

当读取二进制文件时，不传入文件编码时，回调函数的 `data` 参数将返回一个 `Buffer` 对象。

### 同步读文件

同步读取一个文本文件,如果同步读取文件发生错误，则需要用 `try...catch` 捕获该错误

```js
const fs = require('fs');
const { resolve } = require('path');

const filePath = resolve(__dirname, '../index.md');

try {
  const data = fs.readFileSync(filePath, 'utf-8');
  console.log('data: ', data);
} catch (err) {
  // 出错了
}
```

同步读取一个图片文件二进制文件

```js
const fs = require('fs');
const { resolve } = require('path');

const imgPath = resolve(__dirname, './jucy-beef-burger.jpg');

try {
  const buffer = fs.readFileSync(imgPath);
  console.log('buffer: ', buffer);
} catch (err) {
  // 出错了
}
```

## 写文件

### 异步写文件

写入文本文件

```js
const fs = require('fs');

const fileContent = '文件内容';

fs.writeFile('test.txt', fileContent, function(err) {
  if (err) {
    console.log('err: ', err);
  } else {
    console.log('写入成功');
  }
});
```

`writeFile()`的参数依次为文件名、数据和回调函数。如果传入的数据是 String，默认按`UTF-8`编码写入文本文件，如果传入的参数是`Buffer`，则写入的是二进制文件。回调函数由于只关心成功与否，因此只需要一个 err 参数。

如果文件不存在则创建一个新的文件，如果文件已存在则覆盖文件的内容

### 同步写文件

```js
const fs = require('fs');

const fileContent = '同步写入文件内容';

try {
  fs.writeFileSync('test.txt', fileContent);
} catch (error) {
  console.log('error: ', error);
}
```

## 判断文件是否存在

```js
const fs = require('fs');
const util = require('util');

const access = util.promisify(fs.access);

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch (err) {
    return false;
  }
}
```

## ensureFile

1. fs.stat 判断文件是否存在如果存在则调用 callback
2. path.dirname() 获取文件夹路径
3. fs.stat 判断文件夹是否存在，如果报错且 `err.code === 'ENOENT'` 则 fs.mkdir() 先创建文件夹，然后 fs.writeFile() 创建文件
4. 如果父级不是文件夹，则使用 fs.readdir() 抛出一个错误

## 文件夹

### 检查文件夹是否存在

## 权限检查

```js
import { access, constants } from 'fs';

const file = 'package.json';

// Check if the file exists in the current directory.
access(file, constants.F_OK, err => {
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
});

// Check if the file is readable.
access(file, constants.R_OK, err => {
  console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
});

// Check if the file is writable.
access(file, constants.W_OK, err => {
  console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
});

// Check if the file exists in the current directory, and if it is writable.
access(file, constants.F_OK | constants.W_OK, err => {
  if (err) {
    console.error(
      `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`,
    );
  } else {
    console.log(`${file} exists, and it is writable`);
  }
});
```

## 流 stream

流是为 Node.js 应用程序提供动力的基本概念之一，是一种以高效的方式处理读/写文件、网络通信、或任何类型的端到端的信息交换。

在传统的方式中，当告诉程序读取文件时，这会将文件从头到尾读入内存，然后进行处理。使用流，则可以逐个片段地读取并处理（而无需全部保存在内存中）。

相对于使用其他的数据处理方法，流基本上提供了两个主要优点：

- `内存效率`: 无需加载大量的数据到内存中即可进行处理。
- `时间效率`: 当获得数据之后即可立即开始处理数据，这样所需的时间更少，而不必等到整个数据有效负载可用才开始

流分为四类：

- `Readable`: 可以通过管道读取、但不能通过管道写入的流（可以接收数据，但不能向其发送数据）。 当推送数据到可读流中时，会对其进行缓冲，直到使用者开始读取数据为止。
- `Writable`: 可以通过管道写入、但不能通过管道读取的流（可以发送数据，但不能从中接收数据）。
- `Duplex`: 可以通过管道写入和读取的流，基本上相对于是可读流和可写流的组合。
- `Transform`: 类似于双工流、但其输出是其输入的转换的转换流。

### 读取

```js
const fs = require('fs');

const readStream = fs.createReadStream('index.md', 'utf-8');

readStream.on('data', function onData(data) {
  console.log('data: ', data);
});

readStream.on('end', function onEnd() {
  console.log('END');
});

readStream.on('error', function onError(err) {
  console.log('err: ', err);
});
```

data 事件可能会有多次，每次传递的 chunk 是流的一部分数据。

### 写入

```js
const fs = require('fs');

const writeStream = fs.createWriteStream('assets/text.txt');

writeStream.write('我写入了一行\n');
writeStream.write('我又写入了一行\n');
writeStream.write('我再写入了一行\n');
writeStream.end();
```

要以流的形式写入文件，只需要不断调用 `write()` 方法，最后以 `end()` 结束

### pipe

```js
const fs = require('fs');

const readStream = fs.createReadStream('assets/sample.png');
const writeStream = fs.createWriteStream('assets/copy.png');

readStream.pipe(writeStream);
```

默认情况下，当 Readable 流的数据读取完毕，end 事件触发后，将自动关闭 Writable 流。如果我们不希望自动关闭 Writable 流，需要传入参数：

```js
readable.pipe(writable, { end: false });
```

---

## 缓冲器 Buffer

## 前言

在 Node 应用中，需要处理网络协议、操作数据库、处理图片、接收上传文件等，在网络流和文件的操作中，要处理大量二进制数据，而 Buffer 就是在 V8 JavaScript 引擎外部分配的固定大小的内存块（无法调整大小）。

Buffer 与流紧密相连。 当流处理器接收数据的速度快于其消化的速度时，则会将数据放入 buffer 中等候被处理。反之，如果数据到达的速度比进程消耗的数据慢，那么早先到达的数据需要等待一定量的数据到达之后才能被处理

Buffer 是用来存储二进制数据，Buffer 对象类似于数组，每一个元素都是 16 进制的两位数，即每一个元素可以表示一个 0-255 的值, 8 位二进制：00000000，也就是一个字节。在不同的编码下，字符串的每一个字符占用的元素个数不相同，在 UTF-8 编码下，每一个中文字占 3 个元素，字母和半角标点符号占 1 个元素。

## 字符集

字符集就是一套已经定义了确切数字代表每个字符的规则。 现在有很多不同类型的字符集, 常见的有 Unicode 和 ASCII.JavaScript 语言采用 Unicode 字符集.

- `ascii`：仅支持 7 位 ASCII 数据，如果设置去掉高位的话，这种编码是非常快的
- `utf8`：多字节编码的 Unicode 字符，许多网页和其他文档格式都使用 UTF-8
- `utf16le`：2 或 4 个字节，小字节序编码的 Unicode 字符，支持代理对（U+10000 至 U+10FFFF）
- `ucs2`，utf16le 的别名
- `base64`：Base64 编码
- `latin`：一种把 Buffer 编码成一字节编码的字符串的方式
- `binary`：latin1 的别名，
- `hex`：将每个字节编码为两个十六进制字符

## 创建 buffer

```js
const buf = Buffer.alloc(1024);
//或
const buf = Buffer.allocUnsafe(1024);
```

虽然 alloc 和 allocUnsafe 均分配指定大小的 Buffer（以字节为单位），但是 alloc 创建的 Buffer 会被使用零进行初始化，而 allocUnsafe 创建的 Buffer 不会被初始化。 这意味着，尽管 allocUnsafe 比 alloc 要快得多，但是分配的内存片段可能包含可能敏感的旧数据。

当 Buffer 内存被读取时，如果内存中存在较旧的数据，则可以被访问或泄漏。 这就是真正使 allocUnsafe 不安全的原因，在使用它时必须格外小心。

```js
const buf = Buffer.from('Node.js');
```
