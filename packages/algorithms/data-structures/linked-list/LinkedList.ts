import LinkedListNode from './LinkedListNode';

export default class LinkedList {
  head: LinkedListNode | null;
  tail: LinkedListNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value: any) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: any) {
    const newNode = new LinkedListNode(value, null);

    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  insert(value: any, rawIndex: number) {
    const index = Math.max(0, rawIndex);

    if (index === 0) {
      this.prepend(value);
      return this;
    }

    const newNode = new LinkedListNode(value);

    let count = 1;
    let currentNode = this.head;

    while (currentNode) {
      if (count === index) break;
      currentNode = currentNode.next;
      count++;
    }

    if (currentNode) {
      newNode.next = currentNode.next;
      currentNode.next = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode;
      } else {
        this.head = newNode;
        this.tail = newNode;
      }
    }

    return this;
  }

  delete(value: any) {
    if (!this.head) return null;
    let deletedNode = null;

    const currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        deletedNode = currentNode;
        return deletedNode;
      }
      currentNode.next = currentNode;
    }
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

  deleteTail() {
    const deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode = this.head;

    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  // 反转列表
  reverse() {
    let currentNode = this.head;
    let preNode = null;
    let nextNode = null;

    while (currentNode) {
      // 存储下个节点
      nextNode = currentNode.next;

      // 把当前节点的下个节点设置为前一个节点
      currentNode.next = preNode;

      // prevNode 和 currNode 往前移动异步
      preNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = preNode;
  }

  toArray(): LinkedListNode[] {
    const nodes = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString() {
    return this.toArray().toString();
  }
}
