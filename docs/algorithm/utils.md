---
title: 工具函数
---

收集整理一些开发中常用的工具函数

## fixedZero

```js
fixedZero(val) {
  const v = val * 1
  return v > 0 && v < 10 ? `0${val}` : val;
}
```

## isUrl

判读是否为 url

```js
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}
```

## log

控制台上打印日志

```js
function log(groupName, color, ...args) {
  const { group, groupEnd, info } = console;
  group(`%c${groupName}`, `color: ${color}`);
  info(...args);
  groupEnd(groupName);
}
```

## digitUppercase

```js
export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(
      /零./,
      '',
    );
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}
```

## getRandomColor

```js
function getRandomColor() {
  const tag = getRandomColor.tag + 1;
  getRandomColor.tag = tag === 7 ? 0 : tag;
  return getRandomColor.colors[tag];
}
getRandomColor.tag = 0;
getRandomColor.colors = [
  '#ff0000',
  '#ff4500',
  '#ff009d',
  '#008000',
  '#0000ff',
  '#8a2be2',
  '#000000',
];
```

## isPromise

```js
function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}
```

## byteSize

```js
const byteSize = str => new Blob([str]).size;

byteSize('😀'); // 4
byteSize('Hello World'); // 11
```

## capitalize

将字符串的第一个字母转大写

> - String.prototype.toLowerCase(),
> - String.prototype.toUpperCase(),
> - Array.prototype.join()

```js
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

capitalize('fooBar'); // 'FooBar'
capitalize('fooBar', true); // 'Foobar'
```
