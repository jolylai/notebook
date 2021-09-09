import React, { useEffect } from 'react';
import { Input, notification } from 'antd';

export default function Socket() {
  let socket;

  useEffect(() => {
    socket = new WebSocket('ws://localhost:3001', 'vite-hmr');

    socket.addEventListener('open', event => {
      notification.success({
        message: 'WebSocket',
        description: '连接成功',
      });
    });

    socket.addEventListener('message', event => {
      console.log('event: message', event);

      notification.info({
        message: 'WebSocket 服务端消息',
        description: event.data,
      });
    });

    socket.addEventListener('error', event => {
      console.log('event: error', event);
      notification.error({
        message: 'WebSocket Error',
        description: event,
      });
    });

    socket.addEventListener('close', event => {
      console.log('event: close', event);
      notification.success({
        message: 'WebSocket',
        description: '关闭连接成功',
      });
    });

    return () => {
      socket.close();
    };
  });

  const handleSend = data => {
    console.log('data: ', data);
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(data);
    }
    console.log(socket.readyState);
  };

  return (
    <div>
      <Input.Search
        placeholder="请输入信息"
        allowClear
        enterButton="发送"
        onSearch={handleSend}
      />
    </div>
  );
}
