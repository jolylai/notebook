import React, { useRef, useEffect } from 'react';

export default function ViewPort() {
  const containerRef = useRef();

  const isInViewPort = el => {
    const offsetParent = el.offsetParent;
    const viewPortHeight = offsetParent.offsetHeight;
    const scrollTop = offsetParent.scrollTop;
    const offsetTop = el.offsetTop;
    const top = offsetTop - scrollTop;

    return top > 0 && top <= viewPortHeight;
  };

  const onScroll = () => {
    const lis = document.querySelectorAll('.viewport-item');

    if (isInViewPort(lis[10])) {
      console.log(lis[10]);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    container.addEventListener('scroll', onScroll, false);
    return () => {
      container.removeEventListener('scroll', onScroll, false);
    };
  }, [containerRef.current]);

  const ulStyle = {
    height: 300,
    overflow: 'auto',
    liStyle: 'none',
    position: 'relative',
  };

  const liStyle = {
    backgroundColor: '#eee',
    margin: '16px 0',
    padding: 6,
  };

  const lis = Array.from({ length: 100 }).map((_, index) => (
    <li className={`viewport-item`} key={index} style={liStyle}>
      {index + 1}
    </li>
  ));

  return (
    <ul ref={containerRef} style={ulStyle}>
      {lis}
    </ul>
  );
}
