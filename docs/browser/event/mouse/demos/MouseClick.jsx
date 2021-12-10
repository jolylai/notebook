import React from 'react';

function MouseClick() {
  const handleClick = event => {
    console.log(event.type);
  };

  const handleMouseDown = event => {
    console.log(event.type);
    event.stopPropagation();
  };

  const handleMouseUp = event => {
    console.log(event.type);
  };

  const handleDoubleClick = event => {
    console.log(event.type);
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onDoubleClick={handleDoubleClick}
    >
      点击
    </button>
  );
}

export default MouseClick;
