import React, { useEffect } from 'react';

export default () => {
  function handler() {
    console.log('unload');
  }

  useEffect(() => {
    window.addEventListener('unload', handler, false);
    return () => {
      // window.removeEventListener('unload', handler, false);
    };
  }, []);

  return null;
};
