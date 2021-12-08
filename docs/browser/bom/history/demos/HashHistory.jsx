import React, { useEffect } from 'react';

function HashHistory() {
  const handleHashChange = e => {
    console.log('e: hashchange', e);
  };

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange, false);

    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, []);

  return (
    <ul>
      <li>
        <a href="#1">1</a>
      </li>
      <li>
        <a href="#2">2</a>
      </li>
      <li>
        <a href="#3">3</a>
      </li>
    </ul>
  );
}

export default HashHistory;
