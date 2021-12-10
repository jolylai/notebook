import React, { useEffect } from 'react';
import { Button, Space, notification, message } from 'antd';

function Html5History() {
  const popStateHandler = ({ state }) => {
    // 第一个页面加载时状态是 null
    console.log('state: ', state);
  };

  const handleGetCurrentHref = () => {
    message.success(location.href);
  };

  const handleGetCurrentState = () => {
    const state = history.state;

    notification.open({
      message: '当前页面State',
      description: (
        <code>
          <pre>{JSON.stringify(state, null, '  ')}</pre>
        </code>
      ),
    });
  };

  // 跳转
  const handlePushState = () => {
    const to = '/browser/bom/window';

    const currentState = Object.assign({}, history.state, { forward: to });

    history.replaceState(currentState);

    const state = {
      back: location.pathname,
      current: to,
      forward: null,
      position: currentState.position + 1,
      replaced: false,
    };

    history.pushState(state, '', url);
  };

  // 修改当前页面状态
  const handleReplaceState = to => {
    const state = Object.assign({}, history.state, {
      current: location.pathname,
      replaced: false,
    });

    history.replaceState(state, '');
  };

  useEffect(() => {
    window.addEventListener('popstate', popStateHandler, false);

    return () => {
      window.removeEventListener('popstate', popStateHandler, false);
    };
  }, []);

  return (
    <Space>
      <Button onClick={handleGetCurrentState}>当前页面state</Button>
      <Button onClick={handleGetCurrentHref}>location.href</Button>
      <Button onClick={handlePushState}>pushState</Button>
      <Button onClick={handleReplaceState}>ReplaceState</Button>
    </Space>
  );
}

export default Html5History;
