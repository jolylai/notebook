import React, { useEffect, useState } from 'react';

export default () => {
  const [state, setState] = useState({
    scrollTop: null,
    scrollLeft: null,
  });

  function handler(event) {
    if (event.target === document) {
      if (document.scrollingElement) {
        const { scrollTop, scrollLeft } = document.scrollingElement;
        setState({ scrollTop, scrollLeft });
      }
    } else {
      const { scrollTop, scrollLeft } = event.target;
      setState({ scrollTop, scrollLeft });
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handler, false);
    return () => {
      window.removeEventListener('scroll', handler, false);
    };
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
