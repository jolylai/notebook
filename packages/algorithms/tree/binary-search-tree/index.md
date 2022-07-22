---
title: 二叉查找树
---

## 前言

**二叉查找树（Binary Search Tree）**，也称为二叉查找树、有序二叉树（ordered binary tree）或排序二叉树（sorted binary tree），是指一棵空树或者具有下列性质的二叉树：

1. 若任意节点的左子树不空，则左子树上所有节点的值均小于它的根节点的值；
2. 若任意节点的右子树不空，则右子树上所有节点的值均大于它的根节点的值；
3. 任意节点的左、右子树也分别为二叉查找树；

## 二叉查找树插入节点的算法

每次插入的新的结点都是二叉查找树上新的叶子结点，在进行插入操作时，不必移动其它结点，只需改动某个结点的指针，由空变为非空即可。（新插入节点总是叶子节点）

1. 若二叉查找树是空树，则将 插入的值所指节点作为根节点插入，否则：
2. 若插入的值小于二叉查找树的根节点的数据域之值，则把插入的值所指节点插入到左子树中，否则：
3. 若插入的值大于二叉查找树的根节点的数据域之值，则把插入的值所指节点插入到右子树中，否则：
4. 若插入的值等于 二叉查找树的根节点的数据域之值，则返回

```js
insert(value) {
  // 二叉查找树是空树，则将 插入的值所指节点作为根节点插入，
  if (this.nodeValueComparator.equal(this.value, null)) {
    this.value = value;
    return this;
  }

  // 插入的值小于二叉查找树的根节点的数据域之值，则把插入的值所指节点插入到左子树中
  if (this.nodeValueComparator.lessThan(value, this.value)) {
    // 递归插入
    if (this.left) {
      return this.left.insert(value);
    }

    const newNode = new BinarySearchTreeNode(value, this.compareFunction);
    this.setLeft(newNode);
    return newNode;
  }

  // 插入的值大于二叉查找树的根节点的数据域之值，则把插入的值所指节点插入到右子树中
  if (this.nodeValueComparator.greaterThan(value, this.value)) {
    if (this.right) {
      return this.right.insert(value);
    }

    const newNode = new BinarySearchTreeNode(value, this.compareFunction);
    this.setRight(newNode);
    return newNode;
  }

  // 插入的值等于 二叉查找树的根节点的数据域之值
  return this;
}
```

## 查找

1. 若 b 是空树，则搜索失败，否则：
1. 若 x 等于 b 的根节点的数据域之值，则查找成功；否则：
1. 若 x 小于 b 的根节点的数据域之值，则搜索左子树；否则：
1. 查找右子树。

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

## 二叉查找树删除结点的算法

在二叉查找树删去一个结点，分三种情况讨论：

1. 若 `nodeToRemove` 结点为**叶子结点**(左子树和右子树均为空树)。由于删去叶子结点不破坏整棵树的结构，则只需修改其双亲结点的指针即可。

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

若 `nodeToRemove` 结点的左子树和右子树均不空。在删去 `nodeToRemove` 之后，为保持其它元素之间的相对位置不变，可按中序遍历保持有序进行调整，可以有两种做法：

1. 令 `nodeToRemove` 的左子树为 `nodeToRemove` 双亲节点的左/右（依`nodeToRemove`是双亲节点的左子树还是右子树而定）子树，\*s 为`nodeToRemove`左子树的最右下的结点，而`nodeToRemove`的右子树为\*s 的右子树；
2. 令 `nodeToRemove` 的直接前驱（in-order predecessor）或直接后继（in-order successor）替代 `nodeToRemove`，然后再从二叉查找树中删去它的直接前驱（或直接后继）。

#### 删除有一个节点的的节点

若 `nodeToRemove` 结点只有左子树或右子树，此时只要令左子树或右子树直接成为其双亲结点\*f 的左子树（当`nodeToRemove` 是左子树）或右子树（当`nodeToRemove` 是右子树）即可，作此修改也不破坏二叉查找树的特性。
