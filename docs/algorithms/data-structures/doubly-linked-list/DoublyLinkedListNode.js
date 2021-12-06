export default class DoublyLinkedListNode {
  constructor(value, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString(cb) {
    return cb ? cb(this.value) : `${this.value}`;
  }
}
