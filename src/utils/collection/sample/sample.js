function sample(collection) {
  if (collection.length == null) return;
  const length = collection.length;

  const randomIndex = Math.floor(Math.random() * length);

  return collection[randomIndex];
}
