---
title: 前言
order: 1
nav:
  title: 算法
  order: 50
group:
  title: 排序
---

## 前言

排序算法的目标就是将所有元素的主键按照某种方式排列（通常是按照大小或是字母顺序）

## 排序算法模板

? for 流程控制

```js
class Example {
  sort() {}

  less(a, b) {
    return a < b;
  }

  // 交换值
  exch(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  show(arr) {
    console.log(arr.join(' '));
  }

  isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (this.less(arr[i - 1], arr[i])) {
        return false;
      }
    }
  }

  main(arr) {
    this.sort(arr);
    this.isSorted(arr);
    this.show(arr);
  }
}
```
