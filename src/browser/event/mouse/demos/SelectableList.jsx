/**
 * title: 可选列表
 * desc: 点击类表单选， 按住 Control（Mac 为 Commond）点击时为多选
 */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  ul {
    list-style: none;
  }
  .selected {
    background: #00ff00;
  }
`;

export default () => {
  const onClick = e => {
    const { target, metaKey, ctrlKey } = e;

    if (target.tagName != 'LI') {
      return;
    }

    const singleSelect = li => {
      const selected = document.querySelectorAll('.selected');
      for (let ele of selected) {
        ele.classList.remove('selected');
      }
      li.classList.add('selected');
    };

    const toggleSelect = li => {
      li.classList.toggle('selected');
    };

    if (ctrlKey || metaKey) {
      toggleSelect(target);
    } else {
      singleSelect(target);
    }
  };

  const onMouseDown = e => {
    e.preventDefault();
  };

  return (
    <Container>
      <h3>点击列表项选择</h3>
      <ol onClick={onClick} onMouseDown={onMouseDown}>
        <li>Christopher Robin</li>
        <li>Winnie-the-Pooh</li>
        <li>Tigger</li>
        <li>Kanga</li>
        <li>Rabbit. Just rabbit.</li>
      </ol>
    </Container>
  );
};
