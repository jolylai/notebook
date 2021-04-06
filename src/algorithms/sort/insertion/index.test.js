import insertion from './index';

describe('order:insertion', () => {
  test('chars', () => {
    expect(
      insertion(['S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E']),
    ).toEqual(['A', 'E', 'E', 'L', 'M', 'O', 'P', 'R', 'S', 'T', 'X']);
  });
  test('numbers', () => {
    expect(insertion([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });
});
