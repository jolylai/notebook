import { less, exch } from '../../utils/sort';

function selection(arr) {
  const length = arr.length;

  for (let i = 0; i < length; i++) {
    let min = i;
    for (let j = i; j < length; j++) {
      if (less(arr[j], arr[min])) {
        min = j;
      }
    }

    exch(arr, i, min);
  }

  return arr;
}

export default selection;
