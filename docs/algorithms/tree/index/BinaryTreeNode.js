import Comparator from '../../utils/Comparator';

export default class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;

    this.nodeCompare = new Comparator();
  }

  /**
   * 设置当前节点的值
   * @param {*} value
   * @returns {BinaryTreeNode}
   */
  setValue(value) {
    this.value = value;
    return this;
  }

  setLeft(node) {
    // 重置把将要分离出去的节点 parent 值
    if (this.left) {
      this.left.parent = null;
    }

    // 将新节点附加到 Left
    this.left = node;

    // Make current node to be a parent for new left one.
    if (this.left) {
      this.left.parent = this;
    }

    return this;
  }

  setRight(node) {
    if (this.right) {
      this.left.parent = null;
    }

    this.right = node;

    if (this.right) {
      this.right.parent = this;
    }

    return this;
  }

  /**
   * 为什么不需要重置 nodeToRemove.parent
   * @param {*} nodeToRemove
   * @returns
   */
  removeChild(nodeToRemove) {
    if (this.left && this.nodeCompare.compare(this.left, nodeToRemove)) {
      this.left = null;
      return true;
    }

    if (this.right && this.nodeCompare.equal(this.right, nodeToRemove)) {
      this.right = null;
      return true;
    }

    return false;
  }
}
