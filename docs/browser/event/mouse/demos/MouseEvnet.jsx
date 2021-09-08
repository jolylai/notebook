import React, { useRef } from 'react';
import styled from 'styled-components';

export default () => {
  const Container = styled.div`
    button + button {
      margin-left: 8px;
    }
  `;

  const PulsIcon = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
    position: relative;
    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
    }

    &::before {
      border-top: 1px solid;
      width: 100%;
      top: 50%;
    }
    &::after {
      height: 100%;
      border-left: 1px solid;
      left: 50%;
    }
  `;

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
    <Container>
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
        <PulsIcon /> 新增
      </button>
    </Container>
  );
};
