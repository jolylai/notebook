---
title: 前言
group:
  title: 树
---

# 树

- [二叉搜索树](binary-search-tree)
- [AVL 树](avl-tree)
- [红黑树](red-black-tree)
- [线段树](segment-tree) - with min/max/sum range queries examples
- [芬威克树/Fenwick Tree](fenwick-tree) (Binary Indexed Tree)

## 遍历节点

```js
traverseInOrder() {
  let traverse = [];

  // Add left node.
  if (this.left) {
    traverse = traverse.concat(this.left.traverseInOrder());
  }

  // Add root.
  traverse.push(this.value);

  // Add right node.
  if (this.right) {
    traverse = traverse.concat(this.right.traverseInOrder());
  }

  return traverse;
}
```
