import React from 'react';
import { Button } from 'antd';

export default function ScrollIntoView() {
  const ulStyle = {
    height: 300,
    overflow: 'auto',
    liStyle: 'none',
    position: 'relative',
  };

  const liStyle = {
    backgroundColor: '#eee',
    margin: '16px 0',
    padding: 6,
  };

  const lis = Array.from({ length: 100 }).map((_, index) => (
    <li
      className={`viewport-item`}
      key={index}
      style={index === 9 ? { ...liStyle, backgroundColor: 'skyblue' } : liStyle}
    >
      {index + 1}
    </li>
  ));

  const handleScrollIntoView = () => {
    const liElements = document.querySelectorAll(`.viewport-item`);
    liElements[10].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <div>
      <Button onClick={handleScrollIntoView}>scrollIntoView</Button>
      <ul style={ulStyle}>{lis}</ul>
    </div>
  );
}
