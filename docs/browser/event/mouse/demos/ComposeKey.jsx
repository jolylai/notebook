import React from 'react';
import { Button, notification } from 'antd';

export default () => {
  const onClick = e => {
    const { shiftKey, ctrlKey, altKey, metaKey } = e;

    let keys = [];

    if (shiftKey) {
      keys.push('shift');
    }
    if (ctrlKey) {
      keys.push('ctrl');
    }
    if (altKey) {
      keys.push('alt');
    }
    if (metaKey) {
      keys.push('meta');
    }

    notification.open({
      message: '修饰键',
      description: keys.join(','),
    });
  };

  return (
    <div onClick={e => e.stopPropagation()}>
      <Button onClick={onClick}>修饰键</Button>
    </div>
  );
};
