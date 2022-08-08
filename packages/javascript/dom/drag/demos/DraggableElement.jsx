import React from 'react';

function DraggableElement() {
  return (
    <div style={{ display: 'flex' }}>
      <img src="https://picsum.photos/120" alt="img" />
      <div style={{ marginLeft: 24 }}>
        <a href="#">链接默认可拖动</a>
        <div>双击选择文本可拖动</div>
      </div>
    </div>
  );
}

export default DraggableElement;
