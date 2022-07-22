---
title: File API
order: 2
---

## 前言

File API(文件 API)的宗旨是**为 Web 开发人员提供一种安全的方式，以便在客户端访问用户计算机中的文件（如视频、音频、图片、文本），并更好地对这些文件执行操作**。

## 获取 File 对象

<code src='./demos/GetFile.jsx' inline />

通常我们选择文件可以同过点击和拖放两种方式，如上面这个例子，点击然后选择文件，或者直接将文件拖入

### 表单元素

```html
<input multiple id="filesList" type="file" style="display: none;" />
<label for="filesList">上传文件</label>
```

HTML5 在 DOM 中为文件输入元素添加了一个 files 集合。在通过文件输入字段选择了一或多个文件时，files 集合中将包含一组 File 对象，每个 File 对象对应着一个文件。

```js
const filesList = document.getElementById('filesList');

filesList.onchange = function onChange(event) {
  const { files } = event.target;
  console.log('files: ', files);
};
```

### 拖放文件

```html
<label id="droptarget">
  拖放文件到此区域
</label>
```

在页面上创建了自定义的放置目标之后，你可以从桌面上把文件拖放到该目标。

```js
const droptarget = document.getElementById('droptarget');

const handleEvent = event => {
  event.preventDefault();

  if (event.type === 'drop') {
    const files = event.dataTransfer.files;
    console.log('files: ', files);
  }
};

droptarget.dragenter = handleEvent;
droptarget.ondragover = handleEvent;
droptarget.ondrop = handleEvent;
```

这里必须取消 `dragenter`、`dragover` 和 `drop` 的默认行为。在 `drop` 事件中，可以通过 `event.dataTransfer.files` 读取被放置的文件信息。此时它是一个 `File` 对象，与通过文件输入字段取得的 `File` 对象一样。

## 处理 File 对象

每个 File 对象都有下列只读属性。

- `name`:本地文件系统中的文件名。
- `size`:文件的字节大小。
- `type`:字符串，文件的 MIME 类型。
- `lastModifiedDate`:字符串，文件上一次被修改的时间(只有 Chrome 实现了这个属性)。

为了读取文件中的数据，FileReader 提供了如下 几个方法。

- `readAsText(file,encoding)`:以纯文本形式读取文件，将读取到的文本保存在 result 属 性中。第二个参数用于指定编码类型，是可选的。
- `readAsDataURL(file)`:读取二进制数据，并将其编码为 base64 的 data url。读取文件并将文件以数据 URI 的形式保存在 result 属性中(base64)。
- `readAsBinaryString(file)`:读取文件并将一个字符串保存在 result 属性中，字符串中的每个字符表示一字节。
- `readAsArrayBuffer(file)`:读取文件并将一个包含文件内容的 ArrayBuffer 保存在 result 属性中。

这些读取文件的方法为灵活地处理文件数据提供了极大便利。

### 读取成功

读取成功会触发 `load` 事件。

```js
const reader = new FileReader();

reader.readAsDataURL(file);

reader.onload = event => {
  console.log('文件读取成功了', event);
};
```

### 读取错误

由于种种原因无法读取文件，就会触发 error 事件。触发 error 事件时，相关的信息将保存到 FileReader 的 error 属性中。这个属性中将保存一个对象，该对象只有一个属性 code，即错误码。 这个错误码是

```js
const reader = new FileReader();

reader.readAsDataURL(file);

reader.onerror = event => {
  console.log('onerror', event);
};
```

- `1`: 表示未找到文件
- `2`: 表示安全性错误
- `3`: 表示读取中断
- `4`: 表示文件不可读
- `5`: 表示编码错误

在触发 load、error 或 abort 事件后，会触发另一个事件 loadend。loadend 事件发生就意味着已经读取完整个文件，或 者读取时发生了错误，或者读取过程被中断。

```js
const reader = new FileReader();

reader.readAsDataURL(file);

reader.onloadend = event => {
  console.log('onloadend', event);
};
```

### 读取进度

每过 50ms 左右，就会触发一次 `progress` 事件，通过事件对象可以获得 :` lengthComputable``、loaded ` 和 `total`。另外，尽管可能没有包含全部数据， 但每次 `progress` 事件中都可以通过 `FileReader` 的 `result` 属性读取到文件内容。

```js
const reader = new FileReader();
reader.onprogress = event => {
  if (event.lengthComputable) {
    console.log(event.loaded / event.total);
  }

  reader.result;
};
```

### 中断读取

如果想中断读取过程，可以调用 `abort()`方法，这样就会触发 `abort` 事件。

```js
const reader = new FileReader();

reader.readAsDataURL(file);

reader.abort();

reader.onabort = () => {
  console.log('onabort');
};
```

## 解析文本类文件

<code src='./demos/TextFile.jsx' inline />

**文本类文件**指 MIME Type 为 `text/*` 文件，例如，CSS 文件（text/stylesheet），JS 文件（text/javascript），HTML 文件（text/html），txt 文本（text/plain）等等。为了解析方便，可以将文件读取为文本形式。

```js
const getTextFileContent = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(reader.error);
    };
  });
};
```

对于非文本类文件，`readAsText()`方法也是可以用的，但是读出来的东西怕是用不起来，可以尝试读取 Excel 文件看看最终的读取结果是什么

## 读取图片

<code src='./demos/ImageFile.jsx' inline />

读取图像文件并将其编码为 `base64` 的 data url。 以便将其显示给用户 读取二进制数据，读取图像文件并将其保存为数据 URI，以便将其显示给用户

```js
const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};
```

```js
const readFile = file => {
  const { type } = file;

  const reader = new FileReader();

  if (/image/.test(type)) {
    reader.readAsDataURL(file);
  } else {
    reader.readAsText(file);
  }

  // 取消文件读取
  reader.abort();

  // 取消文件读取后调用
  reader.onabort = () => {
    console.log('onabort');
  };

  // 文件读取中调用
  reader.onprogress = event => {
    console.log('onprogress: ', event);
    console.log(event.loaded / event.total);
  };

  // 文件读取成功后调用
  reader.onload = () => {
    console.log('onload');
    // console.log(reader.result);
    setBase64(reader.result);
  };

  // 文件读取错误调用
  reader.onerror = () => {
    console.error(reader.error);
  };

  // 不管文件读取成功、失败、还是中断都会在最后调用
  reader.onloadend = () => {
    console.log('onloadend');
  };
};
```
