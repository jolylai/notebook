export default class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  get leftHeigth() {
    if (!this.left) {
      return 0;
    }

    return this.left.heigth + 1;
  }

  get rightHeigth() {
    if (!this.right) {
      return 0;
    }

    return this.right.heigth + 1;
  }

  get heigth() {
    return Math.max(this.leftHeigth, this.rightHeigth);
  }

  get balanceFactor() {
    return this.leftHeigth - this.rightHeigth;
  }

  setValue(value) {
    this.value = value;
    return this;
  }

  setLeft(node) {
    if (this.left) {
      this.left.parent = null;
    }

    this.left = node;

    if (this.left) {
      this.left.parent = this;
    }

    return this;
  }

  serRight(node) {
    if (this.right) {
      this.right.parent = null;
    }

    this.right = node;

    if (this.right) {
      this.right.parent = this;
    }
  }

  /**
   * 删除子节点
   * @param {BinaryTreeNode} nodeToRemove
   * @returns {Boolean}
   */
  removeChild(nodeToRemove) {
    if (this.left && this.left === nodeToRemove) {
      this.left = null;
      return true;
    }

    if (this.right && this.right === nodeToRemove) {
      this.right = null;
      return true;
    }

    return false;
  }

  /**
   * 替换子节点
   * @param {BinaryTreeNode} nodeToReplace 被替换的节点
   * @param {BinaryTreeNode} replacementNode 替换节点
   * @returns {Boolean}
   */
  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) {
      return false;
    }

    if (this.left && this.left === nodeToReplace) {
      this.left = nodeToReplace;
      return true;
    }

    if (this.right && this.right === nodeToReplace) {
      this.right = replacementNode;
      return true;
    }
    return false;
  }

  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  traverseInOrder() {
    let traverse = [];

    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder());
    }

    traverse = traverse.concat(this.value);

    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder());
    }

    return traverse;
  }

  toString() {
    return this.traverseInOrder().toString();
  }
}
