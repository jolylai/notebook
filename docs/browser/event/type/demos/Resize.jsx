import React, { useEffect, useState } from 'react';

export default () => {
  const [state, setState] = useState({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
  });

  function handler(event) {
    console.log('event: resize', event);

    const { innerWidth, innerHeight, outerWidth, outerHeight } = event.target;

    setState({ innerWidth, innerHeight, outerWidth, outerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', handler, false);
    return () => {
      window.removeEventListener('resize', handler, false);
    };
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
