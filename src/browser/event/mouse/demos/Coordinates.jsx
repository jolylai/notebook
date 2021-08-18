/**
 * title: 坐标位置
 * description: 点击页面获取坐标
 */
import React, { useEffect } from 'react';
import { notification } from 'antd';

function CoordinatesClient() {
  const notice = e => {
    const { clientX, clientY, pageX, pageY, screenX, screenY } = e;

    const content = (
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th></th>
            <th>X</th>
            <th>Y</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>客户区坐标</td>
            <td>{clientX}</td>
            <td>{clientY}</td>
          </tr>
          <tr>
            <td>页面坐标</td>
            <td>{pageX}</td>
            <td>{pageY}</td>
          </tr>
          <tr>
            <td>屏幕坐标</td>
            <td>{screenX}</td>
            <td>{screenY}</td>
          </tr>
        </tbody>
      </table>
    );

    notification.open({
      message: '坐标位置',
      description: content,
    });
  };

  useEffect(() => {
    // document.body.addEventListener('click', notice, false);

    return () => {
      // document.body.removeEventListener('click', notice, false);
    };
  }, []);

  return (
    <img
      onClick={notice}
      src="https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/jucy-beef-burger.jpg"
    />
  );
}

export default CoordinatesClient;
