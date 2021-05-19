import LinkedListNode from './LinkedListNode';

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  /**
   * 向头部添加一个节点
   * @param {*} value
   * @returns {LinkedList}
   */
  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);

    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * 向尾部添加一个节点
   * @param {*} value
   * @returns
   */
  append(value) {
    const newNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deleteNode = null;

    // If the head must be deleted then make next node that is different
    // from the head to be a new head.
    while (this.head && this.head.value === value) {
      deleteNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode.next = next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.tail.value === value) {
      this.tail = currentNode;
    }

    return deleteNode;
  }

  /**
   * 同过值或者回调函数查找节点
   * @param {*} param0
   * @returns
   */
  find({ value, callback }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      if (value !== undefined && currentNode.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail() {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  formArray(values) {
    values.forEach(value => this.append(value));

    return this;
  }

  /**
   *
   * @returns {LinkedList[]}
   */
  toArray() {
    const nodes = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback) {
    return this.toArray()
      .map(node => node.toString(callback))
      .toString();
  }

  reverse() {
    let currentNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currentNode) {
      nextNode = currentNode.next;

      currentNode.next = prevNode;

      prevNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
