function ListCache(entries) {
  let data = [];

  for (let entry of entries) {
    set(entry[0], entry[1]);
  }

  function indexOf(key) {
    let { length } = data;
    while (length--) {
      if (data[length][0] === key) {
        return length;
      }
    }

    return -1;
  }

  function get(key) {
    const index = indexOf(key);

    return index > -1 ? data[index][1] : undefined;
  }

  function has(key) {
    return indexOf(key) > -1;
  }

  function set(key, value) {
    const index = indexOf(key);

    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }

    // 链式调用
    return this;
  }

  return { get, set, indexOf, has };
}

export default ListCache;
