import { useState } from 'react';
import { Space, Button } from 'antd';

export default function Demo1() {
  const [x, setX] = useState(1);

  function* foo() {
    setX(x + 1);
    yield;
  }

  // 构造一个迭代器it来控制这个生成器
  const it = foo();

  const onNext = () => {
    it.next();
  };

  return (
    <Space>
      <span>{x}</span>
      <Button onClick={onNext}>next</Button>
    </Space>
  );
}
