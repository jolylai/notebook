import React, { useEffect, useRef, useState } from 'react';

function OffsetWidthHeight() {
  const boxRef = useRef();

  const [offsetWidth, setOffsetWidth] = useState();
  const [offsetHeight, setOffsetHeight] = useState();

  const updateOffset = () => {
    if (!boxRef.current) return;
    const { offsetWidth, offsetHeight } = boxRef.current;
    setOffsetWidth(offsetWidth);
    setOffsetHeight(offsetHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateOffset, false);
    return () => {
      window.addEventListener('scroll', updateOffset, false);
    };
  }, [boxRef.current]);

  const boxStyle = {
    boxSizing: 'content-box',
    padding: 20,
    border: '25px solid #DBAF88',
    width: 284,
    height: 200,
    overflowY: 'auto',
    overflowX: 'hidden',
  };

  return (
    <div>
      <div ref={boxRef} style={boxStyle}>
        Introduction This Ecma Standard is based on several originating
        technologies, the most well known being JavaScript (Netscape) and
        JScript (Microsoft). The language was invented by Brendan Eich at
        Netscape and first appeared in that company's Navigator 2.0 browser. It
        has appeared in all subsequent browsers from Netscape and in all
        browsers from Microsoft starting with Internet Explorer 3.0. The
        development of this Standard started in November 1996. The first edition
        of this Ecma Standard was adopted by the Ecma General Assembly of June
        1997.
      </div>
      <div>{`offsetWidth: ${offsetWidth},offsetHeight: ${offsetHeight},`}</div>
    </div>
  );
}

export default OffsetWidthHeight;
