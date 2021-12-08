import React, { useEffect } from 'react';
import { Button, Space } from 'antd';

function Html5History() {
  const handleStateChange = e => {
    console.log('e: ', e);
  };

  const handleBack = e => {
    console.log('e: ', e);
    history.go(-1);
  };

  const handleForward = e => {
    console.log('e: ', e);
  };

  const handlePushState = () => {
    history.pushState({}, '', '/browser/bom/window');
  };

  useEffect(() => {
    window.addEventListener('popstate', handleStateChange, false);

    return () => {
      window.removeEventListener('popstate', handleStateChange, false);
    };
  }, []);

  return (
    <Space>
      <Button onClick={handleBack}>后退</Button>
      <Button onClick={handleForward}>前进</Button>
      <Button onClick={handlePushState}>pushState</Button>
      <Button onClick={handlePushState}>修改当前路由状态</Button>
    </Space>
  );
}

export default Html5History;
