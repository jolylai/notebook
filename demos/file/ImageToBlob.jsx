import React, { useState } from 'react';
import { Input } from 'antd';

function ImageToBlob() {
  const [loading, setLoading] = useState(false);

  const handleSearch = async src => {
    setLoading(true);

    try {
      const img = await loadImage(src);
      const blob = await imageToBlob(img);
      console.log('blob: ', blob);
    } catch (error) {
      console.log('error: ', error);
    }

    setLoading(false);
  };

  const loadImage = src => {
    return new Promise((resolve, reject) => {
      const imgElement = document.createElement('img');
      imgElement.crossOrigin = 'anonymous';

      imgElement.onload = function() {
        resolve(imgElement);
      };

      imgElement.onerror = function(e) {
        reject(e);
      };

      imgElement.src = src;
    });
  };

  const imageToBlob = img => {
    return new Promise(resolve => {
      // 生成同尺寸的 <canvas>
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext('2d');

      // 向其中复制图像（此方法允许剪裁图像）
      context.drawImage(img, 0, 0);
      // 我们 context.rotate()，并在 canvas 上做很多其他事情

      // toBlob 是异步操作，结束后会调用 callback
      canvas.toBlob(resolve, 'image/png');

      //   canvas.toBlob(function(blob) {
      //     console.log('blob: ', blob);
      //     //   blob 创建完成，下载它
      //     //   let link = document.createElement('a');
      //     //   link.download = 'example.png';
      //     //   link.href = URL.createObjectURL(blob);
      //     //   link.click();
      //     //   // 删除内部 blob 引用，这样浏览器可以从内存中将其清除
      //     //   URL.revokeObjectURL(link.href);
      //   }, 'image/png');
    });
  };

  return (
    <div>
      <Input.Search
        defaultValue={'https://source.unsplash.com/random/800x600'}
        placeholder="请输入图片URL"
        allowClear
        loading={loading}
        enterButton="图片转Blob"
        onSearch={handleSearch}
      />
      {/* <img
        src="https://source.unsplash.com/random/800x600"
        onClick={handleDownload}
        crossOrigin="anonymous"
      /> */}
    </div>
  );
}

export default ImageToBlob;
