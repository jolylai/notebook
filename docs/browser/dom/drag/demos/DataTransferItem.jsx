import React from 'react';

function DataTransferItem() {
  const handleDragEnter = event => {
    event.preventDefault();
  };

  const handleDrop = event => {
    event.preventDefault();

    const items = event.dataTransfer.items;

    for (let item of items) {
      const { type, kind } = item;
      console.log(`kind: ${kind}, type: ${type}`);

      if (kind === 'string') {
        if (type.indexOf('text/plain') != -1) {
          item.getAsString(function(str) {
            // str是纯文本，该怎么处理，就在这里处理
            console.log(`kind: ${kind}, type: ${type}, getAsString: ${str}`);
          });
        } else if (type.indexOf('text/html') != -1) {
          item.getAsString(function(str) {
            // str是富文本，就在这里处理
            console.log(`kind: ${kind}, type: ${type}, getAsString: ${str}`);
          });
        } else if (type.indexOf('text/uri-list') != -1) {
          item.getAsString(function(str) {
            // str是uri地址，在这里进行处理
            console.log(`kind: ${kind}, type: ${type}, getAsString: ${str}`);
          });
        }
      }

      if (kind === 'file') {
        // 如果是图片
        if (type.indexOf('image/') != -1) {
          const file = items.getAsFile();
          // file就是图片文件对象，可以上传，或者其他处理
          console.log('file: ', file);
        }
        console.log(`kind: ${kind}, type: ${type}`);
      }
    }
  };

  const liStyle = {
    flexGrow: 1,
    border: '1px solid rgb(232, 232, 232)',
    padding: 16,
    width: 80,
    textAlign: 'center',
    marginRight: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div>
      <ul style={{ listStyle: 'none', display: 'flex', paddingLeft: 0 }}>
        <li style={liStyle}>
          <a href="#">链接</a>
        </li>
        <li style={{ flexGrow: 1 }}>
          <img src="https://picsum.photos/80" />
        </li>
        <li draggable style={{ flexGrow: 1 }}>
          li
        </li>
        <li style={{ flexGrow: 1 }}></li>
      </ul>
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
    </div>
  );
}

export default DataTransferItem;
