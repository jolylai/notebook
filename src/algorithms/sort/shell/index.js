import { exch, less } from '../../utils/sort';

function shell(arr) {
  const length = arr.length;

  let h = 1;

  while (h < h / 3) {
    h = 3 * h + 1;
    console.log('h: 1', h);
  }

  while (h >= 1) {
    for (let i = h; i < length; i++) {
      for (let j = i; j >= h && less(arr[j], arr[j - h]); j -= h) {
        exch(arr, j, j - h);
      }
    }
    h = h / 3;
    console.log('h: 2', h);
  }

  return arr;
}

export default shell;
