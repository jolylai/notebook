import React from 'react';
import { Input, notification } from 'antd';

import debounce from '../debounce';

export default function Search() {
  const debounced = debounce(e => {
    console.log(e.target);
  }, 1000);

  const handleChange = e => {
    // e.persist();

    debounced(e);
    // notification.open({
    //   message: e.target.value,
    //   duration: 2,
    // });
  };

  return (
    <div>
      <Input onChange={handleChange} />
    </div>
  );
}
