import React, { useState } from 'react';
import { Form, Input, Select, notification } from 'antd';

function RegExp() {
  const [regExp, setRegExp] = useState('');

  const handleRegExpChange = e => {
    setRegExp(e.target.value);
  };

  const [method, setMethod] = useState('match');

  const handleMethodChange = method => {
    setMethod(method);
  };

  const handleRun = str => {
    console.log('str: ', str);
    const reg = new RegExp(regExp);
    try {
      // const result = reg[method](str);
      // console.log('result: ', result);
    } catch (error) {
      console.log('error: ', error);
    }
    // const result = str[method](new RegExp(regExp));

    // console.log('result: ', result);

    // notification.open({
    //   message: '结果',
    //   description: result,
    // });
  };

  return (
    <div>
      <Form>
        <Form.Item>
          <Input
            placeholder="请输入正则表达式"
            value={regExp}
            onChange={handleRegExpChange}
          />
        </Form.Item>
        <Form.Item>
          <Input.Group compact>
            <Select
              value={method}
              onChange={handleMethodChange}
              style={{ width: '16%' }}
            >
              <Select.Option value="match">match</Select.Option>
              <Select.Option value="test">test</Select.Option>
            </Select>
            <Input.Search
              style={{ width: '84%' }}
              placeholder="请输入匹配的字符串"
              allowClear
              enterButton={method}
              onSearch={handleRun}
            />
          </Input.Group>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegExp;
