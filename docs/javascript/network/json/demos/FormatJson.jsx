import React, { useState } from 'react';
import { Input } from 'antd';

function FormatJson() {
  const [jsonStr, setJsonStr] = useState('');
  const format = jsonStr => {
    console.log('jsonStr: ', jsonStr);
    const json = JSON.stringify(jsonStr, null, 2);
    console.log('json: ', json);
  };

  return <Input.Search value={jsonStr} onSearch={format}></Input.Search>;
}

export default FormatJson;
