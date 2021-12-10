import React, { useEffect, useState } from 'react';

function MousePosition() {
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
    document.addEventListener('click', handler, false);

    return () => {
      document.removeEventListener('click', handler, false);
    };
  }, []);

  return <div>{JSON.stringify(state)}</div>;
}

export default MousePosition;
