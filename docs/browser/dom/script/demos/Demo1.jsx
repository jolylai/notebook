import React, { useRef } from 'react';
import { Button } from 'antd';

function Demo1() {
  const containerRef = useRef();

  return (
    <div ref="containerRef">
      <Button onClick="handle">b</Button>
    </div>
  );
}

export default Demo1;
