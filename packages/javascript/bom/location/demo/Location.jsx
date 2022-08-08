import React, { useState } from 'react';
import { Input } from 'antd';

export default () => {
  const parseLocation = href => {
    const link = document.createElement('a');
    link.href = href;

    const keys = [
      'href',
      'protocol',
      'host',
      'hostname',
      'port',
      'pathname',
      'search',
      'hash',
      'origin',
    ];

    const result = {};

    keys.forEach(key => {
      result[key] = link[key];
    });

    return result;
  };

  const [location, setLocation] = useState({});

  const handleParse = value => {
    const location = parseLocation(value);
    setLocation(location);
  };

  return (
    <div>
      <Input.Search
        defaultValue="https://developer.mozilla.org:80/en-US/search?q=URL#search-results-close-container"
        placeholder="请输入URL"
        enterButton="解析"
        onSearch={handleParse}
      />

      <table className="mt-2">
        <tbody>
          {Object.entries(location).map(([key, value]) => {
            return (
              <tr key={key}>
                <td className="border-solid border border-gray-300 p-2 font-semibold text-black">
                  {key}
                </td>
                <td className="border-solid border border-gray-300 p-2">
                  {value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
