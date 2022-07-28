---
title: 文件系统 fs
---

## 文件属性

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
