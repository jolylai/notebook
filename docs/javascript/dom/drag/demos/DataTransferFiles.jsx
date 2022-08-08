import React, { useState } from 'react';

function DataTransferFiles() {
  const [state, setState] = useState([]);

  const handleDragEnter = event => {
    event.preventDefault();
  };

  const handleDrop = event => {
    event.preventDefault();

    const files = event.dataTransfer.files;

    console.log('files: ', files);
    const details = [];
    for (let file of files) {
      const { name, type, size } = file;

      details.push(`文件名：${name},文件类型： ${type},文件大小： ${size}`);
    }

    setState(details);
  };

  return (
    <div>
      <div
        style={{
          border: '1px dashed #d9d9d9',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
        onDragOver={handleDragEnter}
        onDrop={handleDrop}
      >
        拖拽文件到此区域
      </div>

      <ol>
        {state.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </div>
  );
}

export default DataTransferFiles;
