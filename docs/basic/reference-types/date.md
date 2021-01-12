---
title: Data
group:
  title: 引用类型
  order: 2
---

Date 类型有几个专门用于格式化日期的方法，它们都会返回字符串:

- `toDateString()`:显示日期中的周几、月、日、年(格式特定于实现);
- `toTimeString()`:显示日期中的时、分、秒和时区(格式特定于实现);
- `toLocaleDateString()`:显示日期中的周几、月、日、年(格式特定于实现和地区);
- `toLocaleTimeString()`:显示日期中的时、分、秒(格式特定于实现和地区);
- `toUTCString()`:显示完整的 UTC 日期(格式特定于实现)。

```js
const now = new Date();

now.toDateString(); //  Fri Jan 08 2021
now.toTimeString(); //  13:52:56 GMT+0800 (中国标准时间)
now.toLocaleDateString(); //  2021/1/8
now.toLocaleTimeString(); //  下午1:52:56
```
