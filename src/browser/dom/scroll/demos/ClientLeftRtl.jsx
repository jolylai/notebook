import React, { useRef } from 'react';
import { Button, Space, notification } from 'antd';

export default () => {
  const containerRef = useRef();

  const handleView = property => {
    const instance = containerRef.current;

    if (instance) {
      notification.open({
        message: property,
        description: instance[property],
      });
    }
  };

  const style = {
    width: 300,
    height: 120,
    overflow: 'auto',
    border: '25px solid #e8c48f',
    padding: 16,
    boxSizing: 'content-box',
    direction: 'rtl',
  };

  return (
    <Space>
      <div>
        <div ref={containerRef} style={style}>
          <h3>Introduction</h3>

          <p>
            This Ecma Standard is based on several originating technologies, the
            most well known being JavaScript (Netscape) and JScript (Microsoft).
            The language was invented by Brendan Eich at Netscape and first
            appeared in that company's Navigator 2.0 browser. It has appeared in
            all subsequent browsers from Netscape and in all browsers from
            Microsoft starting with Internet Explorer 3.0. The development of
            this Standard started in November 1996. The first edition of this
            Ecma Standard was adopted by the Ecma General Assembly of June 1997.
          </p>
        </div>

        <p>border: 25px solid #e8c48f;</p>

        <Space>
          <Button onClick={() => handleView('clientLeft')}>
            查看 ClientLeft
          </Button>
          <Button onClick={() => handleView('clientTop')}>
            查看 ClientTop
          </Button>
        </Space>
      </div>

      <img src="https://zh.javascript.info/article/size-and-scroll/metric-client-left-top-rtl.svg" />
    </Space>
  );
};
