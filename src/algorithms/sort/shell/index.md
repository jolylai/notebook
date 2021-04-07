---
title: 希尔排序
order: 4
group:
  title: 排序
---

对于大规模乱序数组插入排序很慢，因为它只会交换相邻的元素，因此元素只能一点一点地从数组 的一端移动到另一端。希尔排序为了加快速度简单地改进了插入排序，交换不相邻的元素以对数组的局部 进行排序，并最终用插入排序将局部有序的数组排序。

使数组中任意间隔为 h 的元素都是有序的。这样的数组被称为 **h 有序数组**。一个 h 有序数组就是 h 个互相独立的有序数组编织在一起组成的一个数组

```js
function shell(arr) {
  const length = arr.length;

  let h = 1;

  while (h < h / 3) {
    h = 3 * h + 1;
  }

  while (h >= 1) {
    for (let i = h; i < length; i++) {
      for (let j = i; j >= h && less(arr[j], arr[j - h]); j -= h) {
        exch(arr, j, j - h);
      }
    }
    h = h / 3;
  }

  return arr;
}
```
