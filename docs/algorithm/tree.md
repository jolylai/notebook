---
title: 树
---

树是一种**分层数据**的抽象模型

```js
const treeData = {
  title: 'root',
  children: [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ],
};
```

## 遍历

### 深度优先遍历

尽可能深的搜索树的分支

```js
function dfs(root) {
  console.log(root.title);
  if (Array.isArray(root.children)) {
    root.children.forEach(dfs);
  }
}
```

### 广度优先遍历

先访问离根节点最近的节点

1. 新建一个队列，把根节点入队
2. 把队头出队并访问
3. 把队头的 children 挨个入队
4. 重复二、三，直到队列为空

```js
function tfs(root) {
  const queue = [root];
  while (queue.length > 0) {
    const item = queue.shift();
    console.log(item.title);
    if (Array.isArray(item.children)) {
      item.children.forEach(child => {
        queue.push(child);
      });
    }
  }
}
```

## 二叉树

### 先序遍历

1. 访问**根节点**
2. 对根节点的**左子树**进行先序遍历
3. 对根节点的**右子树**进行先序遍历

递归实现

```js
function preorder(binaryTree) {
  if (!binaryTree) {
    return;
  }

  console.log(binaryTree.value);

  preorder(binaryTree.left);
  preorder(binaryTree.right);
}
```

调用栈方法实现

```js
function preOrder(binaryTree) {
  if (!binaryTree) {
    return;
  }

  const stack = [binaryTree];
  while (stack.length) {
    const item = stack.pop();
    console.log(item.value);

    if (item.right) {
      stack.push(item.right);
    }
    if (item.left) {
      stack.push(item.left);
    }
  }
}

// 1 2 4 5 3 6 7
```

### 中序遍历

1. 对根节点的**左子树**进行中序遍历
2. 访问**根节点**
3. 对根节点的**右子树**进行中序遍历

递归实现

```js
function inorder(binaryTree) {
  if (!binaryTree) {
    return;
  }

  inorder(binaryTree.left);
  console.log(binaryTree.value);
  inorder(binaryTree.right);
}

// 4 2 5 1 6 3 7
```

调用栈方法实现

```js
function inorder(binaryTree) {
  if (!binaryTree) {
    return;
  }

  const stack = [];
  let pointer = binaryTree;
  while (stack.length || pointer) {
    while (pointer) {
      stack.push(pointer);
      pointer = pointer.left;
    }
    const item = stack.pop();
    console.log(item.value);
    pointer = item.right;
  }
}
// 4 2 5 1 6 3 7
```

### 后序遍历

1. 对根节点的**左子树**进行后序遍历
2. 对根节点的**右子树**进行后序遍历
3. 访问**根节点**

递归实现

```js
function postorder(binaryTree) {
  if (!binaryTree) {
    return;
  }

  postorder(binaryTree.left);
  postorder(binaryTree.right);
  console.log(binaryTree.value);
}

// 4 5 2 6 7 3 1
```

调用栈方法实现

```js
function postorder(binaryTree) {
  if (!binaryTree) {
    return;
  }

  const stack = [binaryTree];
  const outputStack = [];

  while (stack.length) {
    const item = stack.pop();

    outputStack.push(item);
    if (item.left) {
      stack.push(item.left);
    }
    if (item.right) {
      stack.push(item.right);
    }
  }

  while (outputStack.length) {
    const item = outputStack.pop();
    console.log(item.value);
  }
}
// 4 5 2 6 7 3 1
```
