---
title: 链表
---

## 前言

**链表** 是数据元素的线性集合, 元素的线性顺序不是由它们在内存中的物理位置给出的。 相反, 每个元素指向下一个元素。它是由一组节点组成的数据结构,这些节点一起,表示序列。

在最简单的形式下，每个节点由数据和到序列中下一个节点的引用(换句话说，链接)组成。这种结构允许在迭代期间有效地从序列中的任何位置插入或删除元素。

更复杂的变体添加额外的链接，允许有效地插入或删除任意元素引用。链表的一个缺点是访问时间是线性的(而且难以管道化)。

更快的访问，如随机访问，是不可行的。与链表相比，数组具有更好的缓存位置。

**双向链表（Doubly Linked List）**：链表的一种，也叫做双链表。它的每个链节点中有两个指针，分别指向直接后继和直接前驱。

**循环链表（Circular linked list）**：链表的一种。它的最后一个链节点指向头节点，形成一个环。

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

## 基础操作

### 查找节点

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

### 反转链表

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let currentNode = head;
  let prevNode = null;

  while (currentNode) {
    let nextNode = null;
    nextNode = currentNode.next;

    currentNode.next = prevNode;

    prevNode = currentNode;
    currentNode = nextNode;
  }

  return prevNode;
};
```

在遍历列表时，将当前节点的 next 指针改为指向前一个元素。由于节点没有引用其上一个节点，因此必须事先存储其前一个元素。在更改引用之前，还需要另一个指针来存储下一个节点。不要忘记在最后返回新的头引用！

### [删除节点](https://leetcode-cn.com/problems/remove-linked-list-elements/submissions/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  while (head && head.val === val) {
    head = head.next;
  }

  let currentNode = head;

  while (currentNode && currentNode.next) {
    if (currentNode.next.val === val) {
      currentNode.next = currentNode.next.next;
    } else {
      currentNode = currentNode.next;
    }
  }

  return head;
};
```
