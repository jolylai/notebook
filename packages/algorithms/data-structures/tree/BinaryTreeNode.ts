export default class BinaryTreeNode {
  value: any = null;
  left?: BinaryTreeNode | null;
  right?: BinaryTreeNode | null;
  parent?: BinaryTreeNode | null;

  constructor(value: any = null) {
    this.left = null;
    this.right = null;
    this.parent = null;

    this.value = value;
  }

  setLeft(node: BinaryTreeNode | null) {
    if (this.left) {
      this.left.parent = null;
    }

    this.left = node;

    if (this.left) {
      this.left.parent = this;
    }

    return this;
  }

  setRight(node: BinaryTreeNode | null) {
    if (this.right) {
      this.right.parent = null;
    }

    this.right = node;

    if (this.right) {
      this.right.parent = node;
    }

    return node;
  }

  traverseInOrder() {
    let traverse: any[] = [];

    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder());
    }

    traverse.push(this.value);

    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder());
    }

    return traverse;
  }

  toString() {
    return this.traverseInOrder().toString();
  }
}
