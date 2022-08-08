import React, { useEffect, useRef } from 'react';
import { notification } from 'antd';

import lazy from './lazy';

function LazyImage() {
  const rootRef = useRef();

  const list = Array.from({ length: 24 }, (_, index) => (
    <li key={index} style={{ flexBasis: '25%', minHeight: 100 }}>
      <img
        className="lazy"
        data-src={`https://source.unsplash.com/random/800x600?${index}`}
      />
    </li>
  ));

  const loadedImages = [];

  const loaded = img => {
    if (!loadedImages.includes(img)) {
      loadedImages.push(img);
    }

    notification.open({
      message: `已加载 ${loadedImages.length}`,
      description: img.src,
    });
  };

  useEffect(() => {
    if (rootRef.current) {
      const observer = lazy('.lazy', {
        root: rootRef.current,
        loaded,
      });

      observer.observe();
    }
  });

  return (
    <ul
      ref={rootRef}
      style={{
        height: 260,
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'auto',
        listStyle: 'none',
      }}
    >
      {list}
    </ul>
  );
}

export default LazyImage;
