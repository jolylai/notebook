---
title: 深度优先遍历
---

# 深度优先遍历 (DFS)

深度优先遍历 (DFS) 是用来遍历树节点、搜索树节点 或者 数据结构图的算法 is an algorithm for traversing or
searching tree or graph data structures. One starts at
the root (selecting some arbitrary node as the root in
the case of a graph) and explores as far as possible
along each branch before backtracking.

```js
export function depthFirstSearchRecursive(node, callbacks) {
  // Call the "enterNode" callback to notify that the node is going to be entered.
  callbacks.enterNode(node);

  // Traverse left branch only if case if traversal of the left node is allowed.
  if (node.left && callbacks.allowTraversal(node, node.left)) {
    depthFirstSearchRecursive(node.left, callbacks);
  }

  // Traverse right branch only if case if traversal of the right node is allowed.
  if (node.right && callbacks.allowTraversal(node, node.right)) {
    depthFirstSearchRecursive(node.right, callbacks);
  }

  // Call the "leaveNode" callback to notify that traversal
  // of the current node and its children is finished.
  callbacks.leaveNode(node);
}
```
