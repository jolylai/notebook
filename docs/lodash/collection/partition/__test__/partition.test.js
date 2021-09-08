import partition from '../partition';

describe('partition', () => {
  test('should split elements into two groups by predicate', () => {
    const array = [1, 0, 1];

    expect(partition([], value => value)).toEqual([[], []]);
    expect(partition(array, () => true)).toEqual([array, []]);
    expect(partition(array, () => false)).toEqual([[], array]);
  });

  test('should use identity when predicate is undefined', () => {
    const array = [1, 0, 1];

    expect(partition(array)).toEqual([[1, 1], [0]]);
  });
});
