import React, { useEffect } from 'react';

export default () => {
  function handler(event) {
    console.log('event: resize', event);
  }

  useEffect(() => {
    window.addEventListener('resize', handler, false);
    return () => {
      window.removeEventListener('resize', handler, false);
    };
  }, []);

  return null;
};
