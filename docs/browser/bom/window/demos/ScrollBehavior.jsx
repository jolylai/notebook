/**
 * title: 滚动
 * description: 滚动行为
 */

import React from 'react';
import { Button, Space } from 'antd';

export default function ScrollBehavior() {
  const handleScroll = behavior => {
    window.scrollTo({
      left: 100,
      top: 100,
      behavior,
    });
  };

  return (
    <Space>
      <Button onClick={() => handleScroll('auto')}>auto</Button>
      <Button onClick={() => handleScroll('smooth')}>smooth</Button>
    </Space>
  );
}
