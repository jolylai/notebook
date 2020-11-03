```jsx
import React, { useState } from 'react';

export default () => {
  const [src, setSrc] = useState();

  const handleFileChange = event => {
    const reader = new FileReader();
    reader.onload = function() {
      setSrc(reader.result);
    };
    const file = event.target.files[0];
    //
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <p>{src && <img src={src} alt="img" height={200} />}</p>
    </div>
  );
};
```

## Blob 用作 URL

<Alert>
多亏了 type，让我们也可以下载/上传 Blob 对象，而在网络请求中，type 自然地变成了 Content-Type。
</Alert>

```jsx
import React from 'react';

export default () => {
  const blob = new Blob(['hello', ' ', 'world'], { type: 'text/plain' });
  const objUrl = URL.createObjectURL(blob);

  return (
    <div>
      <a download="hello.text" href={objUrl}>
        Download
      </a>
      <p>{objUrl}</p>
    </div>
  );
};
```

在 Javascript 中动态创建一个链接，通过 `link.click()` 模拟一个点击，然后便自动下载了。

```jsx
import React, { useState } from 'react';

export default () => {
  const [src, setSrc] = useState();

  const handleDownload = event => {
    const blob = new Blob(['hello', '', 'world'], { type: 'text/plain' });
    const objUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('download', 'hello.txt');
    link.setAttribute('href', objUrl);

    link.click();

    URL.revokeObjectURL(link.href);
  };

  return (
    <a download="hello.text" onClick={handleDownload}>
      Download
    </a>
  );
};
```

- 浏览器内部为每个通过 URL.createObjectURL 生成的 URL 存储了一个 URL → Blob 映射。因此，此类 URL 很短，但可以访问 Blob。
- URL.revokeObjectURL(url) 从内部映射中移除引用，因此允许 Blob 被删除（如果没有其他引用的话），并释放内存。

## Blob 转换为 base64

## Image 转换为 blob

```jsx
/**
 * title: 点击图片下载
 */
import React, { useState } from 'react';

export default () => {
  const handleDownload = event => {
    const img = event.target;

    // 生成同尺寸的 <canvas>
    let canvas = document.createElement('canvas');
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;

    let context = canvas.getContext('2d');

    // 向其中复制图像（此方法允许剪裁图像）
    context.drawImage(img, 0, 0);
    // 我们 context.rotate()，并在 canvas 上做很多其他事情

    // toBlob 是异步操作，结束后会调用 callback
    canvas.toBlob(function(blob) {
      console.log('blob: ', blob);
      //   blob 创建完成，下载它
      let link = document.createElement('a');
      link.download = 'example.png';
      link.href = URL.createObjectURL(blob);
      link.click();
      // 删除内部 blob 引用，这样浏览器可以从内存中将其清除
      URL.revokeObjectURL(link.href);
    }, 'image/png');
  };

  return (
    <div>
      <img
        src="https://source.unsplash.com/random/800x600"
        onClick={handleDownload}
        crossOrigin="anonymous"
      />
    </div>
  );
};
```

使用 canvas.drawImage 在 canvas 上绘制图像（或图像的一部分）。
调用 canvas 方法 .toBlob(callback, format, quality) 创建一个 Blob，并在创建完成后使用其运行 callback。
