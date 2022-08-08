import React from 'react';
import { Input, message } from 'antd';
import { crosEnabled } from './utils';

export default function CrosEnabled() {
  const onSearch = value => {
    const urlReg = /^https?/;
    const isUrl = urlReg.test(value);

    if (!isUrl) {
      message.warning('请输入正确的URL');
      return;
    }
    const isEnabled = crosEnabled(value);

    isEnabled ? message.success('允许跨域') : message.error('不支持跨域');
  };

  return (
    <div>
      <Input.Search
        placeholder="请输入URL"
        allowClear
        enterButton="URL 跨域检查"
        onSearch={onSearch}
      />
    </div>
  );
}
