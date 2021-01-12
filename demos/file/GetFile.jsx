import React, { useState } from 'react';

export default () => {
  const [files, setFiles] = useState([]);

  const handleChange = e => {
    console.log('files: ', e.target.files);
    setFiles(Array.from(e.target.files));
  };

  const handleDrop = event => {
    event.preventDefault();
    if (event.type === 'drop') {
      const files = event.dataTransfer.files;
      console.log('files: ', files);
      setFiles(Array.from(files));
    }
  };

  return (
    <div>
      <div className="flex">
        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          multiple
          onChange={handleChange}
        />
        <label
          htmlFor="fileInput"
          className="flex-auto p-6 border-dashed border-4 border-gray-400 hover:border-gray-500"
          onDragOver={event => event.preventDefault()}
          onDrop={handleDrop}
        >
          <h2 className="text-center">
            Click or drag file to this area to upload
          </h2>
          <p className="text-center">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </label>
      </div>

      <ul>
        {files.map(file => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};
