import React from 'react';
import { Input, message } from 'antd';
import { urlDownload } from './utils';

export default function CrosEnabled() {
  const onSearch = value => {
    const urlReg = /^https?/;
    const isUrl = urlReg.test(value);

    if (!isUrl) {
      message.warning('请输入正确的URL');
      return;
    }

    urlDownload(value);
  };

  return (
    <div>
      <Input.Search
        placeholder="请输入URL"
        allowClear
        enterButton="下载"
        onSearch={onSearch}
      />
    </div>
  );
}
