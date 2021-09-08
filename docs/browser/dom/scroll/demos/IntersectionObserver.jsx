import React, { useEffect, useRef, useState } from 'react';

const useIntersect = ({ root, rootMargin, threshold }) => {
  const [entry, setEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    // observer.current = new IntersectionObserver(([entry]) => setEntry(entry), {
    //   root,
    //   rootMargin,
    //   threshold,
    // });

    const currentObserver = observer.current;
    if (node) currentObserver.observer(node);

    return () => currentObserver.disconnect();
  }, [node, root, rootMargin, threshold]);

  return [setNode, entry];
};

export default function IntersectionObserver() {
  const containerRef = useRef();

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
    <li
      className={`viewport-item`}
      key={index}
      style={index === 9 ? { ...liStyle, backgroundColor: 'skyblue' } : liStyle}
    >
      {index + 1}
    </li>
  ));

  const handleScrollIntoView = (entries, observer) => {
    for (let entrie of entries) {
      console.log('entrie: ', entrie);
    }
  };

  const [setNode, entry] = useIntersect({
    root: containerRef.current,
    threshold: 1.0,
  });

  // const getContainerRef = ref => {
  //   if (ref) setNode(ref);
  //   containerRef.current = ref;
  // };

  return (
    <ul ref={containerRef} style={ulStyle}>
      {lis}
    </ul>
  );
}
