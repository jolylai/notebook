import { useState } from 'react';
import { Radio } from 'antd';

export default function Demo1() {
  const [value, setValue] = useState(0);

  const onChange = e => {
    console.log('e: ', e);
  };

  return (
    <div>
      <div>我的高度是多少</div>

      <Radio.Group onChange={onChange} value={value}>
        <Radio value={'font-size'}>font-size: 0</Radio>
        <Radio value={'line-height'}>line-height: 0</Radio>
      </Radio.Group>
    </div>
  );
}
