---
title: 路径 path
---

## 从路径中获取信息

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

## \_\_filename

## \_\_dirname

当前模块的文件路径名

```js
console.log('__dirname', __dirname);
// /Users/laiguolin/Workspace/notebook/nodejs/src/basic/io/path/demo
console.log('__filename', __filename);
//  /Users/laiguolin/Workspace/notebook/nodejs/src/basic/io/path/demo/resolve.js
```
