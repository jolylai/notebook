import React, { useEffect, useState } from 'react';

function CoordinatesClient() {
  const [state, setState] = useState({
    clientX: null,
    clientY: null,
    pageX: null,
    pageY: null,
    screenX: null,
    screenY: null,
  });

  const handler = e => {
    const { clientX, clientY, pageX, pageY, screenX, screenY } = e;

    setState({ clientX, clientY, pageX, pageY, screenX, screenY });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handler, false);

    return () => {
      document.removeEventListener('mousemove', handler, false);
    };
  }, []);

  return <div>{JSON.stringify(state)}</div>;
}

export default CoordinatesClient;
