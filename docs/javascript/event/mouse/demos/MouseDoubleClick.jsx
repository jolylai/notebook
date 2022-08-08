import React from 'react';

export default () => {
  const onMouseDown = e => {
    e.preventDefault();
  };

  return (
    <div>
      <p>双击会选择文本</p>
      <p onMouseDown={onMouseDown}>双击不会选择文本</p>
    </div>
  );
};
