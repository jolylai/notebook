import React, { useEffect, useRef, useState } from 'react';

function OffsetWidthHeight() {
  const boxRef = useRef();

  const [offsetWidth, setOffsetWidth] = useState();
  const [offsetHeight, setOffsetHeight] = useState();

  const updateOffset = () => {
    if (!boxRef.current) return;
    const { offsetWidth, offsetHeight } = boxRef.current;
    setOffsetWidth(offsetWidth);
    setOffsetHeight(offsetHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateOffset, false);
    return () => {
      window.addEventListener('scroll', updateOffset, false);
    };
  }, [boxRef.current]);

  const boxStyle = {
    boxSizing: 'box-border',
    padding: '6px 12px',
    border: '2px dashed',
  };

  return (
    <div>
      <div ref={boxRef} style={boxStyle}>
        offsetWidth 和 offsetHeight
      </div>
      <div>{`offsetWidth: ${offsetWidth},offsetHeight: ${offsetHeight},`}</div>
    </div>
  );
}

export default OffsetWidthHeight;
