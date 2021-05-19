import Queue from '../../../data-structures/queue/Queue';

/**
 * @param {Callbacks} [callbacks]
 * @returns {Callbacks}
 */
function initCallbacks(callbacks = {}) {
  const initiatedCallback = callbacks;

  const stubCallback = () => {};
  const defaultAllowTraversal = () => true;

  initiatedCallback.allowTraversal =
    callbacks.allowTraversal || defaultAllowTraversal;
  initiatedCallback.enterNode = callbacks.enterNode || stubCallback;
  initiatedCallback.leaveNode = callbacks.leaveNode || stubCallback;

  return initiatedCallback;
}

/**
 *  广度优先遍历
 * @param {BinaryTreeNode} rootNode 要遍历的节点
 * @param {*} [callbacks] 遍历回调
 */
export default function breadthFirstSearch(rootNode, originalCallbacks) {
  const callbacks = initCallbacks(originalCallbacks);

  const nodeQueue = new Queue();

  nodeQueue.enqueue(rootNode);

  while (!nodeQueue.isEmpty()) {
    const currentNode = nodeQueue.dequeue();
    console.log('currentNode: ', currentNode);

    callbacks.enterNode(currentNode);

    if (
      currentNode.left &&
      callbacks.allowTraversal(currentNode, currentNode.left)
    ) {
      nodeQueue.enqueue(currentNode.left);
    }

    if (
      currentNode.right &&
      callbacks.allowTraversal(currentNode, currentNode.right)
    ) {
      nodeQueue.enqueue(currentNode.right);
    }

    callbacks.leaveNode(currentNode);
  }
}
