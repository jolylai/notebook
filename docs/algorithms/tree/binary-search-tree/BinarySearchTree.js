import BinarySearchTreeNode from './BinarySearchTreeNode';

export default class BinarySearchTree {
  constructor(nodeValueCompareFunction) {
    this.root = new BinarySearchTreeNode(null, nodeValueCompareFunction);

    this.nodeComparator = this.root.nodeComparator;
  }

  inset(value) {
    this.root.insert(value);
  }

  contains(value) {
    this.root.contains(value);
  }

  remove(value) {
    this.root.remove(value);
  }

  toString() {
    return this.root.toString();
  }
}
