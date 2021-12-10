import React, { useState } from 'react';

function MouseButton() {
  const [state, setState] = useState();

  const handleClick = event => {
    console.log('event: ', event.detail);
    setState(event.button);
  };

  return (
    <div>
      <button onMouseDown={handleClick}>button</button>
      <span>e.button: {state}</span>
    </div>
  );
}

export default MouseButton;
