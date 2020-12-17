---
title: 文件
---

```jsx | inline
import React from 'react';

export default () => {
  const handleImageDrag = event => {
    console.log('event: ', event.target.src);
    event.dataTransfer.setData('URL', event.target.src);
  };

  const onChange = e => {
    console.log('files: ', e.target.files);
    console.log('value: ', e.target.value);
  };

  const handleDrop = event => {
    event.preventDefault();
    console.log('event: ', event.type);
    const { type } = event;
    if (type === 'drop') {
      const files = event.dataTransfer.files;
      console.log('files: ', files);
      for (let file of files) {
        uploadFile(file);
      }
    }
  };

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

  const uploadFile = file => {
    const formData = new FormData();

    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    xhr.onload = function onload() {
      const response = getBody(xhr);
      console.log('response: ', response);
    };

    xhr.open('post', 'https://xrtbeta.321go.com/common/file/upload', true);

    xhr.send(formData);
  };

  return (
    <div className="flex">
      <div className="flex-none w-48 relative">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://source.unsplash.com/random"
          alt=""
          onDrag={handleImageDrag}
        />
      </div>

      <div
        className="flex-auto p-6 border-dashed border-4 border-light-blue-500"
        onDrop={handleDrop}
        onDragOver={event => event.preventDefault()}
      >
        <input type="file" multiple onChange={onChange} />
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-xl font-semibold text-center">
            Drag & Drop your files here
          </h1>
        </div>
        <div className="flex align-center">
          <button className="hover:bg-light-blue-200 hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2">
            New
          </button>
        </div>
      </div>
    </div>
  );
};
```

File API(文件 API)的宗旨是**为 Web 开发人员提供一种安全的方式，以便在客户端访问用户计算机中的文件，并更好地对这些文件执行操作**。

## 获取 File 对象

```jsx | inline
import React, { useState } from 'react';
import { Button } from 'antd';

export default () => {
  const [files, setFiles] = useState([]);

  const handleChange = e => {
    console.log('files: ', e.target.files);
    setFiles(Array.from(e.target.files));
  };

  const handleDrop = event => {
    event.preventDefault();
    if (event.type === 'drop') {
      const files = event.dataTransfer.files;
      console.log('files: ', files);
      setFiles(Array.from(files));
    }
  };

  return (
    <div>
      <div className="flex">
        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          multiple
          onChange={handleChange}
        />
        <label
          htmlFor="fileInput"
          className="flex-auto p-6 border-dashed border-4 border-gray-400 hover:border-gray-500"
          onDragOver={event => event.preventDefault()}
          onDrop={handleDrop}
        >
          <h2 className="text-center">
            Click or drag file to this area to upload
          </h2>
          <p className="text-center">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </label>
      </div>

      <ul>
        {files.map(file => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

通常我们选择文件可以同过点击和拖放两种方式，如上面这个例子，点击然后选择文件，或者直接将文件拖入

### 点击上传

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

filesList.oninput = function onInput(event) {
  const { files } = event.target;
  console.log('files: ', files);
};
```

可以在控制面板中看到，每个 File 对象都有下列只读属性。

- `name`:本地文件系统中的文件名。
- `size`:文件的字节大小。
- `type`:字符串，文件的 MIME 类型。
- `lastModifiedDate`:字符串，文件上一次被修改的时间(只有 Chrome 实现了这个属性)。

### 拖放文件

```html
<label id="droptarget">
  <h2 class="text-center">
    drag file to this area
  </h2>
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

这里必须取消 `dragenter`、`dragover` 和 `drop` 的默认行为。在 `drop` 事件中，可以通过 `event.dataTransfer.files` 读取被放置的文件信息。
此时它是一个 File 对象，与通过文件输入字段取得的 File 对象一样。

## 处理 File 对象

为了读取文件中的数据，FileReader 提供了如下 几个方法。

- `readAsText(file,encoding)`:以纯文本形式读取文件，将读取到的文本保存在 result 属 性中。第二个参数用于指定编码类型，是可选的。
- `readAsDataURL(file)`:读取二进制数据，并将其编码为 base64 的 data url。读取文件并将文件以数据 URI 的形式保存在 result 属性中(base64)。
- `readAsBinaryString(file)`:读取文件并将一个字符串保存在 result 属性中，字符串中的每个字符表示一字节。
- `readAsArrayBuffer(file)`:读取文件并将一个包含文件内容的 ArrayBuffer 保存在 result 属性中。

这些读取文件的方法为灵活地处理文件数据提供了极大便利。

读取图像文件并将其保存为数据 URI，以便将其显示给用户

```jsx | inline
import React, { useState } from 'react';
import { Button, Card } from 'antd';

export default () => {
  const [src, setSrc] = useState('https://source.unsplash.com/random');

  const readFile = file => {
    const { type } = file;

    const reader = new FileReader();

    if (/image/.test(type)) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }

    reader.onprogress = event => {
      console.log('event: ', event);
      console.log(event.loaded / event.total);
    };

    reader.onload = () => {
      console.log('onload');
      // console.log(reader.result);
      setSrc(reader.result);
    };

    reader.onabort = () => {
      console.log('onabort');
    };

    reader.onerror = () => {
      console.error(reader.error);
    };

    reader.onloadend = () => {
      console.log('onloadend');
    };
  };

  const handleChange = e => {
    const { files } = e.target;
    if (files[0]) {
      readFile(files[0]);
    }
  };

  return (
    <div>
      <input
        id="uploadImage"
        type="file"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <Card
        hoverable
        bodyStyle={{ padding: 8 }}
        style={{ width: 240 }}
        cover={<img alt="example" src={src} />}
      >
        <Button type="primary" block>
          <label htmlFor="uploadImage">选择图片</label>
        </Button>
      </Card>
    </div>
  );
};
```

为了解析方便，可以将文件读取为文本形式。

文件的处理可以分为

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

  // 取消文件读取后调用
  reader.onabort = () => {
    console.log('onabort');
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

### 读取进度

每过 50ms 左右，就会触发一次 progress 事件，通过事件对象可以获得 :lengthComputable、loaded 和 total。另外，尽管可能没有包含全部数据， 但每次 progress 事件中都可以通过 FileReader 的 result 属性读取到文件内容。

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
