import React, { useEffect } from 'react';

function HashHistory() {
  const hashChangeHandler = e => {
    console.log('e: hashchange', e);
    console.log(`Old URL: ${event.oldURL}, \n New URL: ${event.newURL}`);
    console.log(`Current hash: ${location.hash}`);
  };

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler, false);

    return () => {
      window.removeEventListener('hashchange', hashChangeHandler, false);
    };
  }, []);

  return <a href="#html5-路由">修改散列值</a>;
}

export default HashHistory;
