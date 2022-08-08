import React, { useEffect } from 'react';
import { notification } from 'antd';

export default function ReadyStateChange() {
  const handler = function(event) {
    console.log('readystatechange: ', event);

    notification.open({
      message: 'readystate',
      description: document.readyState,
    });
  };

  useEffect(() => {
    document.addEventListener('readystatechange', handler);

    return () => {
      document.removeEventListener('readystatechange', handler);
    };
  }, []);

  return null;
}
