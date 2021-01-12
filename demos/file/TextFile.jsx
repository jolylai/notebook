import React, { useRef } from 'react';

function TextFile() {
  const inputRef = useRef();

  const handleInputClick = () => {
    inputRef.current && inputRef.current.click();
  };

  const handleChange = async e => {
    try {
      const file = e.target.files[0];
      const content = await getTextFileContent(file);
      console.log('文件内容: ', content);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleDrop = async event => {
    event.preventDefault();

    if (event.type === 'drop') {
      const files = event.dataTransfer.files;
      try {
        const content = await getTextFileContent(files[0]);
        console.log('文件内容: ', content);
      } catch (error) {
        console.log('error: ', error);
      }
    }
  };

  const getTextFileContent = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(reader.error);
      };
    });
  };

  return (
    <div className="flex">
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <label
        className="flex-auto p-6 border-dashed border-4 border-gray-400 hover:border-gray-500"
        onDragOver={event => event.preventDefault()}
        onDrop={handleDrop}
        onClick={handleInputClick}
      >
        <h2 className="text-center">点击或者拖放文本类文件到此区域</h2>
      </label>
    </div>
  );
}

export default TextFile;
