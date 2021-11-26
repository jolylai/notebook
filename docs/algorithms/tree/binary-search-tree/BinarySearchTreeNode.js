import Comparator from '../../utils/Comparator';
import BinaryTreeNode from '../index/BinaryTreeNode';

export default class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value = null, compareFunction) {
    super(value);

    // 比较节点的值
    this.compareFunction = compareFunction;
    this.nodeValueComparator = new Comparator();
  }

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

  contains(value) {
    return !!this.find(value);
  }

  /**
   * 查找树上最小的值
   * @returns {BinarySearchTreeNode}
   */
  findMin() {
    if (!this.left) {
      return this;
    }

    // 递归查找
    return this.left.findMin();
  }

  remove(value) {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error('item not found in the tree');
    }

    const { parent } = nodeToRemove;

    // 叶子节点
    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (parent) {
        parent.removeChild(nodeToRemove);
      } else {
        // 未插入 清除当前节点的值
        nodeToRemove.setValue(undefined);
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      const nextBiggerNode = nodeToRemove.right.findMin();
      if (!this.nodeValueComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        this.right.remove(nextBiggerNode.value);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    } else {
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode);
      } else {
        BinaryTreeNode.copyNode(childNode, nodeToRemove);
      }
    }

    nodeToRemove.parent = null;

    return true;
  }
}

const root = new BinarySearchTreeNode(100);

root.insert(8);
root.insert(7);
root.insert(9);
root.insert(10);

// console.log('root: ', root.find(10));
console.log(root.findMin());
