export default class LinkedListNode {
  value: any;
  next: LinkedListNode | null;

  constructor(value: any, next: LinkedListNode | null = null) {
    this.value = value;
    this.next = next;
  }

  toString(cb?: (value: any) => string) {
    return cb ? cb(this.value) : `${this.value}`;
  }
}
