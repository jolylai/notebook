import React, { useRef } from 'react';
import { Space, Button } from 'antd';

export default function ListGroup() {
  const listRef = useRef();

  const listStyle = {
    listStyle: 'none',
    paddingLeft: 0,
    borderTop: '1px solid rgba(0,0,0,.125)',
  };

  const listItemStyle = {
    padding: '8px 16px',
    border: '1px solid rgba(0,0,0,.125)',
    borderTopWidth: 0,
    marginTop: -1,
  };

  const listItemCls =
    'py-2 px-4 border border-solid border-gray-100 border-t-0';

  const createElement = () => {
    const newChild = document.createElement('li');
    newChild.innerText = Date.now();
    newChild.className =
      'py-2 px-4 border border-solid border-gray-100 border-t-0';

    return newChild;
  };

  const handleAppendChild = () => {
    const newChild = createElement();

    listRef.current.appendChild(newChild);
  };

  const handleInsertBefore = index => {
    const newChild = createElement();
    const childNodes = listRef.current.childNodes;

    listRef.current.insertBefore(newChild, childNodes[0]);
  };

  const handleReplaceChild = () => {
    const newChild = createElement();
    const firstChild = listRef.current.firstChild;

    listRef.current.replaceChild(newChild, firstChild);
  };

  const handleRemoveChild = () => {
    const lastChild = listRef.current.lastChild;

    listRef.current.removeChild(lastChild);
  };

  const handleCloneNode = () => {
    const list = listRef.current;

    const shallowList = list.cloneNode(true);
    console.log('shallowList: ', shallowList);
    list.appendChild(shallowList);
  };

  return (
    <div>
      <ul style={listStyle} ref={listRef}>
        <li style={listItemStyle}>An item</li>
        <li style={listItemStyle}>A second item</li>
        <li style={listItemStyle}>A third item</li>
        <li style={listItemStyle}>A fourth item</li>
        <li style={listItemStyle}>And a fifth one</li>
      </ul>
      <Space>
        <Button onClick={handleAppendChild}>列表末尾添加一个节点</Button>
        <Button onClick={handleInsertBefore}>列表头部添加一个节点</Button>
        <Button onClick={handleReplaceChild}>替换第一个节点</Button>
        <Button onClick={handleRemoveChild}>删除最后一个节点</Button>
        <Button onClick={handleCloneNode}>复制列表</Button>
      </Space>
    </div>
  );
}
