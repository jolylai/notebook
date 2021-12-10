import React, { useEffect } from 'react';
import { message } from 'antd';

function LoadImage({}) {
  const loadImageHandler = event => {
    const src = event.target.src;

    message.success(`图片加载成功: ${src}`);
  };

  useEffect(() => {
    const img = document.getElementById('load-img');

    img.addEventListener('load', loadImageHandler, false);

    return () => {
      img.removeEventListener('load', loadImageHandler, false);
    };
  });

  const loadHandler = () => {
    message.success('所有外部资源如:图片、JavaScript 文件和 CSS 文件,加载成功');
  };

  useEffect(() => {
    window.addEventListener('load', loadHandler, false);
    return () => {
      window.addEventListener('load', loadHandler, false);
    };
  });

  return <img src="https://picsum.photos/600/200" id="load-img" />;
}

export default LoadImage;
