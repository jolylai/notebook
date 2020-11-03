---
title: 鼠标事件
group:
  title: 事件
  order: 1
---

## 事件类型

| 事件          | 触发时机                                                                                                                                              | 冒泡 | 键盘触发 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------- |
| `mouseenter`  | 在鼠标光标从元素外部首次移动到元素范围之内时触发，而且 在光标移动到后代元素上不会触发。                                                               | 否   |
| `mousemove`   | 当鼠标指针在元素内部移动时重复地触发。                                                                                                                |      | 否       |
| `mousedown`   | 在用户按下了任意鼠标按钮时触发。                                                                                                                      |      | 否       |
| `mouseover`   | 在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触发。                                                                            |      | 否       |
| `click`       | 在用户单击主鼠标按钮(一般是左边的按钮)或者按下回车键时触发。这一点对确保易访问性很重要，意味着 onclick 事件处理程序既可以通过键盘也可以通过鼠标执行。 | 是   | 是       |
| `dblclick`    | 在用户双击主鼠标按钮(一般是左边的按钮)时触发。                                                                                                        |
| `mouseleave`  | 在位于元素上方的鼠标光标移动到元素范围之外时触发。**这个事件不冒泡，而且在光标移动到后代元素上不会触发。**                                            |
| `mouseout`    | 在鼠标指针位于一个元素上方，然后用户将其移入另一个元素时触发。又移入的另一个元素可能位于前一个元素的外部，也**可能是这个元素的子元素**。              |      | 否       |
| `mouseup`     | 在用户释放鼠标按钮时触发。                                                                                                                            |      | 否       |
| `contextmenu` | 在鼠标右键被按下时触发。还有其他打开上下文菜单的方式，例如使用特殊的键盘按键，在这种情况下它也会被触发，因此它并不完全是鼠标事件。                    |

## 事件顺序

```jsx
import React, { useRef } from 'react';
import styled from 'styled-components';

export default () => {
  const Container = styled.div`
    button + button {
      margin-left: 8px;
    }
  `;

  const PulsIcon = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
    position: relative;
    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
    }

    &::before {
      border-top: 1px solid;
      width: 100%;
      top: 50%;
    }
    &::after {
      height: 100%;
      border-left: 1px solid;
      left: 50%;
    }
  `;

  const onContextMenu = e => {
    console.log('contextmenu');
  };

  const onMouseEnter = e => {
    console.log('mouseenter');
  };

  const onMouseDown = e => {
    console.log('mousedown');
  };

  const onMouseUp = e => {
    console.log('mouseup');
  };

  const onClick = e => {
    console.log('click', e.button);
  };

  const onDoubleClick = e => {
    console.log('dblclick');
  };

  const onMouseMove = e => {
    console.log('mousemove');
  };

  const onMouseLeave = e => {
    console.log('mouseleave');
  };

  const onMouseOut = e => {
    console.log('mouseout');
  };

  return (
    <Container>
      <button
        onContextMenu={onContextMenu}
        onMouseEnter={onMouseEnter}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseMove={onMouseMove}
      >
        鼠标事件
      </button>
      <button onMouseDown={onMouseDown} onMouseUp={onMouseUp} onClick={onClick}>
        单击事件
      </button>
      <button
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onDoubleClick={onDoubleClick}
      >
        双击事件
      </button>
      <button onContextMenu={onContextMenu}>鼠标右键</button>
      <button onMouseLeave={onMouseLeave} onMouseOut={onMouseOut}>
        <PulsIcon /> 新增
      </button>
    </Container>
  );
};
```

#### mouseleave 和 mouseout 的区别

鼠标移入子元素时 `mouseout` 会触发 而 `mouseleave` 不会触发, 而鼠标移出时`mouseout` 和 `mouseleave` 都会触发

#### click 事件触发顺序

`mousedown` -> `mouseup` -> `click`

#### dbclick 事件触发顺序

`mousedown` -> `mouseup` -> `mousedown` -> `mouseup` -> `dbclick`

#### 如何在 `mousedown` 和 `mouseup` 中判断是按下鼠标的那个按键触发的

无论是按下鼠标左键还是鼠标右键都会触发 `mousedown` 和 `mouseup`

| 鼠标按键状态     | event.button |
| ---------------- | ------------ |
| 左键 (主要按键)  | 0            |
| 中键 (辅助按键)  | 1            |
| 右键 (次要按键)  | 2            |
| X1 键 (后退按键) | 3            |
| X2 键 (前进按键) | 4            |

```jsx
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState();

  const onMouseDown = e => {
    console.log('mousedown', e.button);
    setValue(e.button);
  };

  return (
    <div>
      <button onMouseDown={onMouseDown}>单击事件</button>
      <p>e.button: {value}</p>
    </div>
  );
};
```

## 组合键

- `shiftKey`：Shift
- `altKey`：Alt（或对于 Mac 是 Opt）
- `ctrlKey`：Ctrl
- `metaKey`：对于 Mac 是 Cmd

```js
const onClick = e => {
  const { shiftKey, ctrlKey, altKey, metaKey } = e;
};
```

```jsx
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState();

  const onClick = e => {
    const { shiftKey, ctrlKey, altKey, metaKey } = e;

    if (shiftKey) {
      console.log('按住 shift 键点击');
    }

    setValue({
      shiftKey,
      ctrlKey,
      altKey,
      metaKey,
    });
  };

  return (
    <div>
      <button onClick={onClick}>组合键</button>
      <p style={{ whiteSpace: 'pre' }}>{JSON.stringify(value, null, '\t')}</p>
    </div>
  );
};
```

## 坐标

所有的鼠标事件都提供了两种形式的坐标：

- 相对于窗口的坐标：clientX 和 clientY。
- 相对于文档的坐标：pageX 和 pageY。

```jsx
/**
 * title: 点击鼠标获取鼠标坐标
 */
import React, { useState, useEffect } from 'react';

export default () => {
  const [value, setValue] = useState();

  const onMouseMove = e => {
    const { clientX, clientY, pageX, pageY } = e;

    setValue({
      clientX,
      clientY,
      pageX,
      pageY,
    });
  };

  useEffect(() => {
    window.addEventListener('click', onMouseMove);

    return () => {
      window.removeEventListener('click', onMouseMove);
    };
  }, []);

  return (
    <div>
      <p style={{ whiteSpace: 'pre' }}>{JSON.stringify(value, null, '\t')}</p>
    </div>
  );
};
```

## 防止在鼠标按下时的选择

双击鼠标会产生选择文本的副作用。使用 `preventDefault`阻止默认行为来防止选择文本的副作用

```js
const onMouseDown = e => {
  e.preventDefault();
};
```

```jsx
/**
 * title: 用户体验
 * desc: 双击不会选择文本
 */
import React, { useState, useEffect } from 'react';

export default () => {
  const [value, setValue] = useState();

  const onMouseDown = e => {
    e.preventDefault();
  };

  return (
    <div>
      <p>双击会选择文本</p>
      <p onMouseDown={onMouseDown}>双击不会选择文本</p>
    </div>
  );
};
```

## 可选列表

创建一个可以选择元素的列表，例如在文件管理器中。

- 点击列表元素，只选择该元素（添加 .selected 类），取消选择其他所有元素。
- 如果点击时，按键 Ctrl（在 Mac 中为 Cmd）是被按下的，则选择会被切换到被点击的元素上，但其他元素不会被改动。

[原生类名操作](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)

```jsx
/**
 * title: 可选列表
 * desc: 点击类表单选， 按住 Control（Mac 为 Commond）点击时为多选
 */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .selected {
    background: #00ff00;
  }
`;

export default () => {
  const onClick = e => {
    const { target, metaKey, ctrlKey } = e;

    if (target.tagName != 'LI') {
      return;
    }

    const singleSelect = li => {
      const selected = document.querySelectorAll('.selected');
      for (let ele of selected) {
        ele.classList.remove('selected');
      }
      li.classList.add('selected');
    };

    const toggleSelect = li => {
      li.classList.toggle('selected');
    };

    if (ctrlKey || metaKey) {
      toggleSelect(target);
    } else {
      singleSelect(target);
    }
  };

  const onMouseDown = e => {
    e.preventDefault();
  };

  return (
    <Container>
      <p>Click on a list item to select it.</p>
      <ul onClick={onClick} onMouseDown={onMouseDown}>
        <li>Christopher Robin</li>
        <li>Winnie-the-Pooh</li>
        <li>Tigger</li>
        <li>Kanga</li>
        <li>Rabbit. Just rabbit.</li>
      </ul>
    </Container>
  );
};
```

## 移动鼠标

```jsx
/**
 * title: 用户体验
 * desc: 双击不会选择文本
 */
import React from 'react';

export default () => {
  const onMouseOver = e => {
    const { target, relatedTarget } = e;
    console.log('mouseover: ', { target, relatedTarget });
  };

  const onMouseOut = e => {
    const { target, relatedTarget } = e;
    console.log('mouseout: ', { target, relatedTarget });
  };

  return (
    <div>
      <p>双击会选择文本</p>
      <p onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        双击不会选择文本
      </p>
    </div>
  );
};
```
