import React, { useEffect, useRef, useState } from 'react';

function ClientWidthHeight() {
  const boxRef = useRef();

  const [clientWidth, setClientWidth] = useState();
  const [clientHeight, setClientHeight] = useState();

  useEffect(() => {
    const { clientWidth, clientHeight } = boxRef.current;
    setClientWidth(clientWidth);
    setClientHeight(clientHeight);
  }, [boxRef.current]);

  const boxStyle = {
    boxSizing: 'box-border',
    padding: '6px 12px',
    border: '2px dashed',
  };

  return (
    <div>
      <div ref={boxRef} style={boxStyle}>
        clientWidth 和 clientHeight
      </div>
      <div>{`clientWidth: ${clientWidth},clientHeight: ${clientHeight},`}</div>
    </div>
  );
}

export default ClientWidthHeight;
