---
title: 排序
---

[算法动画](https://visualgo.net/en)

## 冒泡排序

1. 比较所有相邻元素，如果第一个比第二个大，则交换他们
2. 一轮下来可以保证最后一个数是最大的
3. 执行 n - 1 轮，就可以完成排序

```js
const arr = [6, 5, 4, 3, 2, 1];

function bubbleSort(arr) {
  let length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

// [1,2,3,4,5,6]
```

<Alert>
使用双重循环，性能差，工作中比较少用
</Alert>

## 选择排序

1. 找到数组中的最小值，选中它并将其放置到第一位
2. 接着找到第二小的值，选中它并将其放置到第二位
3. 以此类推，执行 n - 1 轮

```js
function selectionSort(arr) {
  const length = arr.length;

  // 执行 n - 1
  for (let i = 0; i < length - 1; i++) {
    let indexMin = i;
    for (let j = i + 1; j < length; j++) {
      if (arr[indexMin] > arr[j]) {
        indexMin = j;
      }
    }

    if (indexMin !== i) {
      const temp = arr[i];
      arr[i] = arr[indexMin];
      arr[indexMin] = temp;
    }
  }
  return arr;
}
```

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
