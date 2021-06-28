import React, { useEffect } from 'react';
import { notification } from 'antd';

export default function DOMContentLoaded() {
  const handler = function(event) {
    console.log('DOMContentLoaded: ', event);
    const img = document.getElementById('DOMContentLoaded-img');

    notification.open({
      message: 'DOMContentLoaded',
      description: `Image size: ${img.offsetWidth}x${img.offsetHeight}`,
    });
  };

  const onloadHandler = function(event) {
    console.log('onload: ', event);
    const img = document.getElementById('DOMContentLoaded-img');

    notification.open({
      message: 'onload',
      description: `Image size: ${img.offsetWidth}x${img.offsetHeight}`,
    });
  };

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', handler);
    window.addEventListener('load', onloadHandler, false);

    return () => {
      document.removeEventListener('DOMContentLoaded', handler);
      window.removeEventListener('load', onloadHandler, false);
    };
  }, []);

  return (
    <img
      id="DOMContentLoaded-img"
      src="https://en.js.cx/clipart/train.gif?speed=1&cache=0"
    />
  );
}
