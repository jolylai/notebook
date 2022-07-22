import { Space } from 'antd';
import React from 'react';

export default () => {
  const onContextMenu = e => {
    console.log('contextmenu');
  };

  const onMouseEnter = e => {
    console.log('mouseenter');
  };

  const onMouseDown = e => {
    console.log('mousedown');
  };

  const onMouseUp = e => {
    console.log('mouseup');
  };

  const onClick = e => {
    console.log('click', e.button);
  };

  const onDoubleClick = e => {
    console.log('dblclick');
  };

  const onMouseMove = e => {
    console.log('mousemove');
  };

  const onMouseLeave = e => {
    console.log('mouseleave');
  };

  const onMouseOut = e => {
    console.log('mouseout');
  };

  return (
    <Space>
      <button
        onContextMenu={onContextMenu}
        onMouseEnter={onMouseEnter}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseMove={onMouseMove}
      >
        鼠标事件
      </button>
      <button onMouseDown={onMouseDown} onMouseUp={onMouseUp} onClick={onClick}>
        单击事件
      </button>
      <button
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onDoubleClick={onDoubleClick}
      >
        双击事件
      </button>
      <button onContextMenu={onContextMenu}>鼠标右键</button>
      <button onMouseLeave={onMouseLeave} onMouseOut={onMouseOut}>
        新增
      </button>
    </Space>
  );
};
