/**
 * title: 可选列表
 * desc: 点击类表单选， 按住 Control（Mac 为 Commond）点击时为多选
 */
import React, { useState } from 'react';

export default () => {
  const [checkList, setCheckList] = useState([]);

  const fruits = ['Apple', 'Pear', 'Orange', 'Banana'];

  const listItems = fruits.map(fruit => (
    <li
      data-value={fruit}
      key={fruit}
      style={{
        padding: 8,
        marginTop: -1,
        border: '1px solid #d1d5db',
        backgroundColor: checkList.includes(fruit) ? 'skyblue' : '',
      }}
    >
      {fruit}
    </li>
  ));

  const toggleCheckList = value => {
    const exist = checkList.includes(value);

    let newCheckList = [...checkList];

    if (exist) {
      newCheckList = newCheckList.filter(item => item !== value);
    } else {
      newCheckList.push(value);
    }

    setCheckList(newCheckList);
  };

  const clickHandler = event => {
    const value = event.target.getAttribute('data-value');

    if (event.metaKey) {
      // 多选
      toggleCheckList(value);
    } else {
      checkList.includes(value) ? setCheckList([]) : setCheckList([value]);
    }
  };

  return (
    <ol style={{ paddingLeft: 0, listStyle: 'none' }} onClick={clickHandler}>
      {listItems}
    </ol>
  );
};
