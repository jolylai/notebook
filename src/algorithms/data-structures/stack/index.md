---
title: 栈
---

栈(stack) 是一种抽象数据类型,用作表示元素的集合,具有两种主要操作:

push, 添加元素到栈的顶端(末尾);
pop, 移除栈最顶端(末尾)的元素.
以上两种操作可以简单概括为“后进先出(LIFO = last in, first out)”。

此外,应有一个 peek 操作用于访问栈当前顶端(末尾)的元素。

"栈"这个名称,可类比于一组物体的堆叠(一摞书,一摞盘子之类的)。

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/stack.png)

栈是一种 LIFO(Last-In-First-Out， 后进先出)的数据结构，也就是最新添加的项最早被移除。类似蜂窝煤炉。

JavaScript 没有栈的数据结构，但可以使用 Array 实现栈的所有功能

```js
const stack = [];

// 推入两项
let count = stack.push(1, 2);
console.log(count); // 2

const item = stack.pop();
console.log(item); // 2
```

## 十进制转二进制

- 后出来的余数反而要排到前面
- 把余数依次入栈，然后再出栈，就可以实现余数倒序输出

## 有效的括号

给定一个只包括 '('，')'，'{'，'}'，'['，']'  的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/valid-parentheses)

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const stack = [];

  const map = new Map();
  map.set('(', ')');
  map.set('{', '}');
  map.set('[', ']');

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (map.has(char)) {
      stack.push(char);
    } else {
      const stackTop = stack.pop();
      if (map.get(stackTop) !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
};
```

- 越靠后的左括号，对应的右括号越靠前
- 左括号入栈，右括号出栈，最后栈空了就是和合法的
