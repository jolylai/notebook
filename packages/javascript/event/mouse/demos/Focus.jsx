import React, { ref } from 'react';

function Focus() {
  const focusRef = ref();
  return (
    <div>
      <button ref={focusRef}> Button</button>
    </div>
  );
}

export default Focus;
