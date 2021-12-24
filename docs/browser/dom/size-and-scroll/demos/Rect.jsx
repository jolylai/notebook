import React, { useRef, useEffect, useState } from 'react';

function Rect() {
  const root = useRef(null);

  useEffect(() => {
    updateRect();
  }, [root.current]);

  const [rect, setRect] = useState({});

  const updateRect = () => {
    if (!root.current) return;

    const rect = root.current.getBoundingClientRect();
    setRect(rect);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateRect, false);
    return () => {
      window.removeEventListener('scroll', updateRect, false);
    };
  });

  const style = {
    width: 80,
    height: 80,
    padding: 10,
    margin: 2,
    border: '10px solid #eee',
    boxSizing: 'content-box',
  };

  return (
    <div style={{ display: 'flex' }}>
      <div ref={root} style={style}></div>
      <pre>
        <code>{JSON.stringify(rect, null, 2)}</code>
      </pre>
    </div>
  );
}

export default Rect;
