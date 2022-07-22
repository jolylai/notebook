import React from 'react';

export default () => {
  return (
    <div>
      <div
        style={{
          width: '300px',
          borderColor: 'blue',
          borderStyle: 'solid',
          borderWidth: 1,
        }}
      >
        <span>Short span. </span>
        <span id="long">Long span that wraps withing this div.</span>
      </div>
      <div
        style={{
          position: 'absolute',
          borderColor: 'red',
          borderWidth: '1',
          borderStyle: 'solid',
          zIndex: '10',
        }}
      ></div>
    </div>
  );
};
