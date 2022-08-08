import React, { useEffect, useState } from 'react';

export default () => {
  const [state, setState] = useState({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
  });

  function resizeHandler(event) {
    console.log('event: resize', event.target);

    const { innerWidth, innerHeight, outerWidth, outerHeight } = event.target;

    setState({ innerWidth, innerHeight, outerWidth, outerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', resizeHandler, false);
    return () => {
      window.removeEventListener('resize', resizeHandler, false);
    };
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
