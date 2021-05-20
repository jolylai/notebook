export default class Heap {
  constructor() {
    if (new.target === Heap) {
      throw new TypeError('Cannot constructor Heap instance directly');
    }
    this.heapContainer = [];
  }
}
