function assign(object, ...sources) {
  const to = Object(object);

  for (let source of sources) {
    if (source !== undefined && source !== null) {
      for (let sourceKey in source) {
        if (Object.prototype.hasOwnProperty.call(source, source)) {
          to[sourceKey] = source[sourceKey];
        }
      }
    }
  }
}

export default assign;
