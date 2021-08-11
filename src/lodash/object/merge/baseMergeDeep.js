/**
 *
 * @param {Object} object The destination object
 * @param {*} source
 * @param {*} key
 * @param {*} srcIndex
 * @param {*} mergeFunc
 * @param {*} customizer
 * @param {*} stack
 */
function baseMergeDeep(
  object,
  source,
  key,
  srcIndex,
  mergeFunc,
  customizer,
  stack,
) {
  const objectValue = object[key];
  const srcValue = source[key];

  let newValue = customizer
    ? customizer(objectValue, srcValue, object, source, stack)
    : undefined;

  let isCommon = newValue === undefined;

  if (Array.isArray(objectValue) && Array.isArray(srcValue)) {
    newValue = objectValue;
  }

  if (isCommon) {
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
  }
}
