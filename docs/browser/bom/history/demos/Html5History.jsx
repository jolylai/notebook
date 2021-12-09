import React, { useEffect } from 'react';
import { Button, Space } from 'antd';

function Html5History() {
  const popStateHandler = e => {
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
    const url = '/browser/bom/window';
    const state = {
      back: url,
      current: '',
      forward: '',
      position: 0,
      replaced: false,
    };
    history.pushState(state, '', url);
  };

  useEffect(() => {
    window.addEventListener('popstate', popStateHandler, false);

    return () => {
      window.removeEventListener('popstate', popStateHandler, false);
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
