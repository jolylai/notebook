import React, { useState } from 'react';
import { Input, Select, notification } from 'antd';

export default () => {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('get');

  const onSendRequest = url => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      setLoading(false);
      notification.success({
        message: '响应数据',
        description: xhr.response,
      });
    };

    xhr.onerror = function onError() {
      setLoading(false);
    };

    xhr.open(method, url, true);

    setLoading(true);

    xhr.send(null);
  };

  return (
    <div>
      <Input.Group compact>
        <Select style={{ width: 80 }} value={method} onChange={setMethod}>
          <Select.Option value="get">GET</Select.Option>
          <Select.Option value="post">POST</Select.Option>
        </Select>
        <Input.Search
          style={{ width: '80%' }}
          defaultValue="http://www.mocky.io/v2/5e01ea3f2f00007d97dcd401"
          placeholder="请输入URL"
          allowClear
          loading={loading}
          enterButton="发送请求"
          onSearch={onSendRequest}
        />
      </Input.Group>
    </div>
  );
};
