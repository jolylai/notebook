import React, { useState } from 'react';
import { Input, Form, Select } from 'antd';

export default () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [method, setMethod] = useState('get');

  const onSendRequest = url => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      setLoading(false);

      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        console.log(xhr.responseText);
        setResponse(xhr.responseText);
      } else {
        console.log('Request was unsuccessful: ' + xhr.status);
      }
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

      {response && (
        <Form>
          <Form.Item label="响应数据">{response}</Form.Item>
        </Form>
      )}
    </div>
  );
};
