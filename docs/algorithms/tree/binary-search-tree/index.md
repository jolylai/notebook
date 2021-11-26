---
title: 二叉查找树
---

## 插入

```js
insert(value) {
  if (this.nodeValueComparator.equal(this.value, null)) {
    this.value = value;
    return this;
  }

  // 小的放左边
  if (this.nodeValueComparator.lessThan(value, this.value)) {
    // 递归插入
    if (this.left) {
      return this.left.insert(value);
    }

    const newNode = new BinarySearchTreeNode(value, this.compareFunction);
    this.setLeft(newNode);
    return newNode;
  }

  // 大的放右边
  if (this.nodeValueComparator.greaterThan(value, this.value)) {
    if (this.right) {
      return this.right.insert(value);
    }

    const newNode = new BinarySearchTreeNode(value, this.compareFunction);
    this.setRight(newNode);
    return newNode;
  }

  return this;
}
```

## 查找

```js
find(value) {
  if (this.nodeValueComparator.equal(value, this.value)) {
    return this;
  }

  if (this.nodeValueComparator.lessThan(value, this.value)) {
    return this.left.find(value);
  }

  if (this.nodeValueComparator.greaterThan(value, this.value)) {
    return this.right.find(value);
  }

  return null;
}
```

## 删除

#### 删除叶子节点

```js
remove(value) {
  const nodeToRemove = this.find(value);

  if (!nodeToRemove) {
    throw new Error('Item not found in the tree');
  }

  const { parent } = nodeToRemove;

  if (!nodeToRemove.left && !nodeToRemove.right) {
    // Node is a leaf and thus has no children.
    if (parent) {
      // Node has a parent. Just remove the pointer to this node from the parent.
      parent.removeChild(nodeToRemove);
    } else {
      // Node has no parent. Just erase current node value.
      nodeToRemove.setValue(undefined);
    }
  }
}
```

#### 删除有两子节点的节点

找到右边最小的节点来替换当被删除的节点

#### 删除有一个节点的的节点
