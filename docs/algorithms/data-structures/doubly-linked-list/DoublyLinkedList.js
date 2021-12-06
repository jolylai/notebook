import Comparator from '../../utils/Comparator';
import DoublyLinkedListNode from './DoublyLinkedListNode';

export default class DoublyLinkedList {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value) {
    const newNode = new DoublyLinkedListNode(value, this.head);

    if (this.head) {
    }
  }
}
