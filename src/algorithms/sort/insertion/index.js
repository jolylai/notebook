import { exch, less } from '../../utils/sort';

function insertion(arr) {
  const length = arr.length;
  for (let i = 1; i < length; i++) {
    for (let j = i; j > 0 && less(arr[j], arr[j - 1]); j--) {
      exch(arr, j, j - 1);
    }
  }

  return arr;
}

export default insertion;
