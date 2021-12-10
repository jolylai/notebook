---
title: 链表
order: 10
---

## 链表

**链表** 是数据元素的线性集合, 元素的线性顺序不是由它们在内存中的物理位置给出的。 相反, 每个元素指向下一个元素。它是由一组节点组成的数据结构,这些节点一起,表示序列。

在最简单的形式下，每个节点由数据和到序列中下一个节点的引用(换句话说，链接)组成。这种结构允许在迭代期间有效地从序列中的任何位置插入或删除元素。

更复杂的变体添加额外的链接，允许有效地插入或删除任意元素引用。链表的一个缺点是访问时间是线性的(而且难以管道化)。

更快的访问，如随机访问，是不可行的。与链表相比，数组具有更好的缓存位置。

## 节点

```js
class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
```

## 查找节点

```js
find({ value, callback }) {
  if (!this.head) {
    return null;
  }

  let currentNode = this.head;

  while (currentNode) {
    if (callback && callback(currentNode.value)) {
      return currentNode;
    }

    if (value !== undefined) {
      if (this.compare && this.compare(currentNode.value, value) === 0) {
        return currentNode;
      } else if (currentNode.value === value) {
        return currentNode;
      }
    }

    currentNode = currentNode.next;
  }

  return null;
}
```