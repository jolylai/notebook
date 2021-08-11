function createAssigner(assigner) {
  return (object, ...sources) => {
    let length = sources.length;
    let customizer = length > 1 ? sources[length - 1] : undefined;

    const guard = length > 2 ? sources[2] : undefined;
  };
}
