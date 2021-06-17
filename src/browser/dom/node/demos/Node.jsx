import React, { useRef } from 'react';
import { Space, Button } from 'antd';

let counter = 4;

function Node() {
  const ulRef = useRef();

  const createElement = () => {
    const newChild = document.createElement('li');
    newChild.innerText = counter++;
    newChild.className = 'bg-green-300';

    return newChild;
  };

  const handleAppendChild = () => {
    const newChild = createElement();

    ulRef.current.appendChild(newChild);
  };

  const handleInsertBefore = index => {
    const newChild = createElement();
    const childNodes = ulRef.current.childNodes;

    ulRef.current.insertBefore(newChild, childNodes[0]);
  };

  const handleReplaceChild = () => {
    const newChild = createElement();
    const firstChild = ulRef.current.firstChild;

    ulRef.current.replaceChild(newChild, firstChild);
  };

  const handleRemoveChild = () => {
    const lastChild = ulRef.current.lastChild;

    ulRef.current.removeChild(lastChild);
  };

  const handleCloneNode = () => {
    const list = ulRef.current;

    const shallowList = list.cloneNode(true);
    console.log('shallowList: ', shallowList);
    list.appendChild(shallowList);
  };

  return (
    <div>
      <ul ref={ulRef} className="list-none">
        <li>1</li>
        <li>2</li>
        <li>3</li>
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

export default Node;
