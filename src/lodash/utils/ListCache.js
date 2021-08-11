class ListCache {
  constructor(entries) {}

  indexOf(key) {
    const data = this._data;
    let length = data.length;
    while (length--) {
      if (data[length][key] === key) {
        return length;
      }
    }

    return -1;
  }

  has(key) {
    return this.indexOf(key) > -1;
  }

  set(key, value) {
    const data = this._data;
    if (!this.has(key)) {
    }
  }
}
