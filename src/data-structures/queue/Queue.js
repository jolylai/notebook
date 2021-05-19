import LinkedList from '../linked-list/LinkedList';

export default class Queue {
  constructor() {
    this.LinkedList = new LinkedList();
  }

  isEmpty() {
    return !this.LinkedList.head;
  }

  /**
   * 查看队列首个元素， 不移除
   */
  peek() {
    if (!this.LinkedList.head) {
      return null;
    }

    return this.LinkedList.head.value;
  }

  /**
   * 添加元素到队列未
   * @param {*} value
   */
  enqueue(value) {
    this.LinkedList.append(value);
  }

  /**
   * 出列   删除队列的第一个元素
   */
  dequeue() {
    const removeHead = this.LinkedList.deleteHead();
    return removeHead ? removeHead : null;
  }

  toString(calllback) {
    return this.LinkedList.toString(calllback);
  }
}
