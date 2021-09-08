import React, { useEffect, useRef } from 'react';
import { message } from 'antd';

function LoadImage({}) {
  const imageContainer = useRef();

  useEffect(() => {
    const img = document.createElement('img');

    img.addEventListener('load', event => {
      message.success('图片加载成功');
    });

    img.src = 'https://picsum.photos/200';

    imageContainer.current.appendChild(img);
  });

  return <div ref={imageContainer}></div>;
}

export default LoadImage;
