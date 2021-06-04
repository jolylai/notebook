import BinaryTreeNode from '../BinaryTreeNode';

export default class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value = null) {
    super(value);
  }

  /**
   * 插入值
   * @param {*} value
   * @returns {BinarySearchTreeNode}
   */
  insert(value) {
    // 当前值为空
    if (this.value === null) {
      this.value = value;
      return this;
    }

    if (value < this.value) {
      if (this.left) {
        return this.left.insert(value);
      }

      const newNode = new BinarySearchTreeNode(value);
      this.setLeft(newNode);

      return newNode;
    }

    if (value > this.value) {
      if (this.right) {
        return this.right.insert(value);
      }

      const newNode = new BinarySearchTreeNode(value);
      this.serRight(newNode);

      return newNode;
    }

    return this;
  }

  find(value) {
    if (this.value === value) {
      return this;
    }

    if (value < this.value && this.left) {
      return this.left.find(value);
    }

    if (value > this.value && this.right) {
      return this.right.find(value);
    }

    return null;
  }

  contains(value) {
    return !!this.find(value);
  }

  /**
   * 查找最小节点
   * @returns {BinarySearchTreeNode}
   */
  findMin() {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }
}
