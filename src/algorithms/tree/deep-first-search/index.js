function initCallbacks(callbacks = {}) {
  // Init empty callbacks object.
  const initiatedCallbacks = {};

  // Empty callback that we will use in case if user didn't provide real callback function.
  const stubCallback = () => {};
  // By default we will allow traversal of every node
  // in case if user didn't provide a callback for that.
  const defaultAllowTraversalCallback = () => true;

  // Copy original callbacks to our initiatedCallbacks object or use default callbacks instead.
  initiatedCallbacks.allowTraversal =
    callbacks.allowTraversal || defaultAllowTraversalCallback;
  initiatedCallbacks.enterNode = callbacks.enterNode || stubCallback;
  initiatedCallbacks.leaveNode = callbacks.leaveNode || stubCallback;

  // Returned processed list of callbacks.
  return initiatedCallbacks;
}

export function deepFirstSearchRecursive(node, callbacks) {
  callbacks.enterNode(node);

  if (node.left && callbacks.allowTraversal(node, node.left)) {
    deepFirstSearchRecursive(node.left, callbacks);
  }

  if (node.right && callbacks.allowTraversal(node, node.right)) {
    deepFirstSearchRecursive(node.right, callbacks);
  }

  callbacks.leaveNode(node);
}

/**
 *  深度优先遍历
 * @param {BinaryTreeNode} rootNode 要遍历的节点
 * @param {*} [callbacks] 遍历回调
 */
export default function deepFirstSearch(rootNode, callbacks) {
  const processedCallbacks = initCallbacks(callbacks);

  deepFirstSearchRecursive(rootNode, processedCallbacks);
}
