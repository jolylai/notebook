---
title: 流 stream
---

## 前言

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

## 读取

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

## 写入

```js
const fs = require('fs');

const writeStream = fs.createWriteStream('assets/text.txt');

writeStream.write('我写入了一行\n');
writeStream.write('我又写入了一行\n');
writeStream.write('我再写入了一行\n');
writeStream.end();
```

要以流的形式写入文件，只需要不断调用 `write()` 方法，最后以 `end()` 结束

## pipe

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
