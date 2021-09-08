import React, { useState } from 'react';

export default () => {
  const handleDownload = event => {
    const blob = new Blob(['hello', '', 'world'], { type: 'text/plain' });
    const objUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('download', 'hello.txt');
    link.setAttribute('href', objUrl);

    link.click();

    URL.revokeObjectURL(link.href);
  };

  return (
    <a download="hello.text" onClick={handleDownload}>
      Download
    </a>
  );
};
