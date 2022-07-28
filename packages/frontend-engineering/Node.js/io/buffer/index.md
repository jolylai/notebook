---
title: 缓冲器 Buffer
---

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
