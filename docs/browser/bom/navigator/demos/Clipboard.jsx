import React, { useState } from 'react';
import { Button, Space } from 'antd';

function Clipboard() {
  const [clipboardText, setClipboardText] = useState('');

  const queryClipboardPermission = async () => {
    const result = await navigator.permissions.query({
      name: 'clipboard-read',
    });
    console.log('result: ', result);
  };

  const getClipboardText = async () => {
    const clipboardText = await navigator.clipboard.readText();

    setClipboardText(clipboardText);
  };

  return (
    <div>
      <div>{clipboardText}</div>
      <Space>
        <Button onClick={queryClipboardPermission}>剪切板权限</Button>
        <Button onClick={getClipboardText}>获取剪切板内容</Button>
      </Space>
    </div>
  );
}

export default Clipboard;
