import React, { useState } from 'react';

import { Input, notification } from 'antd';

export default function NumberFormat() {
  const [number, setNumber] = useState('123456789');

  const format = number => {
    const reg = /(?=\d{3}$)/g;
    const formateNumber = number.replace(reg, ',');
    console.log('formateNumber: ', formateNumber);
  };

  return (
    <div>
      <Input.Search value={number} onSearch={format} />
    </div>
  );
}
