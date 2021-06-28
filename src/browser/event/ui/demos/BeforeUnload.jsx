import React, { useEffect } from 'react';

export default () => {
  function beforeunload(event) {
    let message = "I'm really going to miss you if you go.";
    event.returnValue = message;
    return message;
  }

  useEffect(() => {
    window.addEventListener('beforeunload', beforeunload, false);
    return () => {
      window.removeEventListener('beforeunload', beforeunload, false);
    };
  }, []);

  return null;
};
