import React, { useRef, useState } from 'react';

function TextFile() {
  const inputRef = useRef();

  const [fileContent, setFileContent] = useState('');

  const handleInputClick = () => {
    inputRef.current && inputRef.current.click();
  };

  const handleChange = async e => {
    try {
      const file = e.target.files[0];
      const content = await getTextFileContent(file);
      setFileContent(content);
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
        setFileContent(content);
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
    <div>
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <label
        className="block p-6 border-dashed border-4 border-gray-400 hover:border-gray-500"
        onDragOver={event => event.preventDefault()}
        onDrop={handleDrop}
        onClick={handleInputClick}
      >
        <h2 className="text-center">点击或拖放文本类文件到此区域</h2>
      </label>
      <p className="whitespace-pre shadow max-h-40 overflow-auto">
        {fileContent}
      </p>
    </div>
  );
}

export default TextFile;
