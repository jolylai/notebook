import LinkedList from '../linked-list/LinkedList';

export default class HashTable {
  constructor(hashTableSize = 32) {
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList());

    this.keys = {};
  }

  /**
   * 将字符串 key 转换成 hash 值
   * @param {String} key
   * @returns
   */
  hash(key) {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0,
    );

    return hash % this.buckets.length;
  }

  set(key, value) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;

    const bucketLinkedList = this.buckets[keyHash];

    const node = bucketLinkedList.find({
      callback: nodeValue => nodeValue.key === key,
    });

    if (!node) {
      // 插入值
      bucketLinkedList.append({ key, value });
    } else {
      // 更新值
      node.value.value = value;
    }
  }

  delete(key) {
    const keyHash = this.hash(key);

    delete this.keys[key];

    const bucketLinkedList = this.buckets[keyHash];

    const node = bucketLinkedList.find({
      callback: nodeValue => nodeValue.key === key,
    });

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  /**
   * Get value by key
   * @param {String} key
   * @returns {*}
   */
  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)];

    const node = bucketLinkedList.find({
      callback: nodeValue => nodeValue.key === key,
    });

    return node ? node.value.value : undefined;
  }

  has(key) {
    return Object.prototype.hasOwnProperty.call(this.keys, key);
  }

  getKeys() {
    return Object.keys(this.keys);
  }

  getValues() {
    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket
        .toArray()
        .map(linkedListNode => linkedListNode.value.value);

      return values.concat(bucketValues);
    }, []);
  }
}
