import React, { useEffect, useRef, useState } from 'react';

function ClientLeftTop() {
  const boxRef = useRef();

  const [clientLeft, setClientLeft] = useState();
  const [clientTop, setClientTop] = useState();

  useEffect(() => {
    const { clientLeft, clientTop } = boxRef.current;
    setClientLeft(clientLeft);
    setClientTop(clientTop);
  }, [boxRef.current]);

  const boxStyle = {
    boxSizing: 'box-border',
    padding: '6px 12px',
    border: '2px dashed',
  };

  return (
    <div>
      <div ref={boxRef} style={boxStyle}>
        clientLeft 和 clientTop
      </div>
      <div>{`clientLeft: ${clientLeft},clientTop: ${clientTop},`}</div>
    </div>
  );
}

export default ClientLeftTop;
