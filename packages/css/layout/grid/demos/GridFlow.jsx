import { useState } from 'react';
import { Radio } from 'antd';
import styles from './GridFlow.less';

export default function GridFlow() {
  const [value, setValue] = useState('row');

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const constants = ['row', 'column', 'dense', 'row dense', 'column dense'];

  return (
    <div>
      <div className={styles.gridFlow} style={{ gridAutoFlow: value }}>
        <div className={styles.item}>01</div>
        <div className={styles.item}>02</div>
        <div className={styles.item}>03</div>
        <div className={styles.item}>04</div>
        <div className={styles.item}>05</div>
      </div>
      <div style={{ marginTop: 8 }}>
        <Radio.Group onChange={onChange} value={value}>
          {constants.map(constant => (
            <Radio value={constant}>{constant}</Radio>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
}
