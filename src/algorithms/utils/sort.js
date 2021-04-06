/**
 * 比较两个元素的大小
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 */
export function less(a, b) {
  return a < b;
}

/**
 * 交换数组中两个元素的位置
 * @param {Array} arr
 * @param {Number} i
 * @param {Number} j
 */
export function exch(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
