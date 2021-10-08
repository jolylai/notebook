import React, { useState } from 'react';
import { Button, Input, notification, Space } from 'antd';

function Cookie() {
  const getCookie = async name => {
    var match = document.cookie.match(
      new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'),
    );

    let cookie = match ? match[3] : document.cookie;
    console.log('match: ', match);

    notification.open({
      message: 'Cookie',
      description: cookie,
    });
  };

  const getRawCookie = () => {
    notification.open({
      message: 'document.cookie',
      description: document.cookie,
    });
  };

  return (
    <Space>
      <Button onClick={getRawCookie}>document.cookie</Button>
      <Input.Search
        placeholder="请输入Cookie名"
        allowClear
        enterButton="Cookie"
        onSearch={getCookie}
      />
    </Space>
  );
}

export default Cookie;
